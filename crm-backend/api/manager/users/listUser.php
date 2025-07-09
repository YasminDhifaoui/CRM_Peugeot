<?php
session_start();

if(!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'manager'){
    http_response_code(403);
    echo json_encode(['error' => 'Access denied: only manager can access']);
    exit;
}
try{
    $sql = 'SELECT * FROM users';
    $stmt = $pdo->query($sql);
    $users = $stmt->fetchAll();
    echo json_encode(['message' => $users]);

}catch(PDOException $e){
  http_response_code(500);
    echo json_encode(['error' => 'Error fetching users: ' . $e->getMessage()]);  
}
?>
