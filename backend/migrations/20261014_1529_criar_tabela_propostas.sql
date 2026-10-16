CREATE TABLE IF NOT EXISTS propostas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  artista VARCHAR(255) NOT NULL,
  contratante VARCHAR(255) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  descricao TEXT,
  local VARCHAR(255) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  `data` DATE NOT NULL,
  status ENUM('Pendente', 'Confirmado', 'Cancelado') NOT NULL DEFAULT 'Pendente'
);
