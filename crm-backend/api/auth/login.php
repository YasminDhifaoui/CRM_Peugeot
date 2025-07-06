<?php
session_start();
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
require_once '../../config/headers.php';
require_once '../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

$cin = $data['cin'] ?? '';
$password = $data['password'] ?? '';

if (!$cin || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'CIN and password are required']);
    exit;
}

// Fetch user by CIN
$stmt = $pdo->prepare("SELECT * FROM users WHERE cin = :cin");
$stmt->execute(['cin' => $cin]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user'] = [
        'id' => $user['id'],
        'cin' => $user['cin'],
        'role' => $user['role'],
        'nom' => $user['nom'],
        'prenom' => $user['prenom']
    ];

    echo json_encode(['message' => 'Login successful', 'user' => $_SESSION['user']]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid CIN or password']);
}
?>