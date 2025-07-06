<?php
session_start();
require_once '../../../config/headers.php';
require_once '../../../config/db.php';

// ✅ Check if manager is logged in
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'manager') {
    http_response_code(403);
    echo json_encode(['error' => 'Access denied: only manager can add users']);
    exit;
}

// ✅ Get posted data
$data = json_decode(file_get_contents("php://input"), true);

$cin = $data['cin'] ?? '';
$nom = $data['nom'] ?? '';
$prenom = $data['prenom'] ?? '';
$telephone = $data['telephone'] ?? null;
$photoPath = $data['photoPath'] ?? null;
$password = $data['password'] ?? '';
$role = $data['role'] ?? '';


$allowedRoles = ['agentC', 'responsableV'];


// ✅ Validate required fields
if (!$cin || !$nom || !$prenom || !$password ||!in_array($role, $allowedRoles)) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required and role must be agent or commercial']);
    exit;
}

// ✅ Hash password
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

// ✅ Insert user
try {
    $stmt = $pdo->prepare("INSERT INTO users (cin, nom, prenom, telephone, photoPath, password, role)
        VALUES (:cin, :nom, :prenom, :telephone, :photoPath, :password, :role)");

    $stmt->execute([
        'cin' => $cin,
        'nom' => $nom,
        'prenom' => $prenom,
        'telephone' => $telephone,
        'photoPath' => $photoPath,
        'password' => $passwordHash,
        'role' => $role
    ]);

    echo json_encode(['message' => 'User added successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error adding user: ' . $e->getMessage()]);
}
