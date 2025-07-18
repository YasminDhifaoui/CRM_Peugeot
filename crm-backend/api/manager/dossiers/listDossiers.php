<?php
session_start();
require_once '../../../config/headers.php';
require_once '../../../config/db.php';

if ($_SESSION['user']['role'] !== 'manager') {
    http_response_code(403);
    echo json_encode(['error' => 'Access denied: only manager can access']);
    exit;
}

try {
    // Example: later you might filter by status or agent
    $params = [];
    $whereClause = "";

    if (isset($_GET['status']) && $_GET['status'] !== 'Tous') {
        $whereClause .= " WHERE d.status = :status";
        $params[':status'] = $_GET['status'];
    }

    $sql = "
        SELECT 
            d.*,
            CONCAT(u.nom, ' ', u.prenom) AS agent_full_name
        FROM dossiers d
        JOIN users u ON d.user_id = u.id
        $whereClause
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $dossiers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['message' => $dossiers]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error fetching dossiers: ' . $e->getMessage()]);
}
