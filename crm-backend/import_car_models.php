<?php
// PostgreSQL DB connection
$host = 'localhost';
$db   = 'crm_peugeot';
$user = 'postgres';
$pass = 'admin';
$dsn = "pgsql:host=$host;dbname=$db";
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    // Define the categories
    $categories = ['opel', 'peugeot', 'citroen'];

    foreach ($categories as $category) {
        $directory = __DIR__ . "/uploads/car_models/$category";
        if (!is_dir($directory)) continue;

        // Get all image files in the category directory
        $images = scandir($directory);

        foreach ($images as $image) {
            if ($image === '.' || $image === '..') continue;

            $modelName = pathinfo($image, PATHINFO_FILENAME); // e.g., "corsa"
            $imagePath = "/uploads/car_models/$category/$image"; // Relative path for DB

            // Insert into DB
            $stmt = $pdo->prepare("INSERT INTO car_models (model_name, category, image_path) VALUES (?, ?, ?)");
            $stmt->execute([$modelName, ucfirst($category), $imagePath]);

            echo "Inserted: $modelName ($category)\n";
        }
    }

    echo "✅ All models inserted successfully.\n";

} catch (PDOException $e) {
    die("❌ Database error: " . $e->getMessage());
}
