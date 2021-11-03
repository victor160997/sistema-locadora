CREATE DATABASE locadora;
USE locadora;

CREATE TABLE cliente(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(200),
	cpf VARCHAR(11),
    data_nascimento DATETIME
);

CREATE INDEX idx_cpf
ON cliente (cpf);

CREATE INDEX idx_nome
ON cliente (nome);

CREATE TABLE filme(
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	classificacao_indicativa INT,
    lancamento TINYINT
);

CREATE INDEX idx_lancamento
ON filme (lancamento);

CREATE INDEX idx_titulo
ON filme (titulo);


SELECT * FROM cliente;

CREATE TABLE locacao(
	id_locacao INT PRIMARY KEY AUTO_INCREMENT,
	id_cliente INT,
	id_filme INT,
	data_locacao DATETIME,
	data_devolução DATETIME,
	FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente),
	FOREIGN KEY (id_filme) REFERENCES filme (id_filme)
);








