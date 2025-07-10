<?php
require_once '../../../config/headers.php';
require_once '../../auth/getSessionUser.php';
require_once '../../../config/db.php';

// ✅ Check manager access
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'manager') {
    http_response_code(403);
    echo json_encode(['error' => 'Access denied: only managers can update dossiers']);
    exit;
}

// ✅ Only allow PUT or POST for update
$method = $_SERVER['REQUEST_METHOD'];
if (!in_array($method, ['POST', 'PUT'])) {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

// ✅ Parse JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['id']) ||
    !is_numeric($data['id']) ||
    empty($data['status'])
) {
    http_response_code(400);
    echo json_encode(['error' => 'Données invalides']);
    exit;
}

// 🧼 Sanitize input
$id = intval($data['id']);
$status = htmlspecialchars(trim($data['status']));
$commentaire = isset($data['commentaire']) ? htmlspecialchars(trim($data['commentaire'])) : null;
$immatriculation = isset($data['immatriculation']) ? htmlspecialchars(trim($data['immatriculation'])) : null;
$modeles = isset($data['modeles']) ? htmlspecialchars(trim($data['modeles'])) : null;

try {
    $sql = "UPDATE dossiers 
            SET status = :status, 
                commentaire = :commentaire, 
                immatriculation = :immatriculation,
                modeles = :modeles,
                updated_at = NOW()
            WHERE id = :id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':status' => $status,
        ':commentaire' => $commentaire,
        ':immatriculation' => $immatriculation,
        ':modeles' => $modeles,
        ':id' => $id
    ]);

    echo json_encode(['success' => true, 'message' => 'Dossier mis à jour avec succès']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de la mise à jour : ' . $e->getMessage()]);
}
