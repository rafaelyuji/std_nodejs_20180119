create table livros (
    id int(11) not null auto_increment primary key,
    titulo varchar(255),
    descricao text,
    preco decimal(10, 2)
);