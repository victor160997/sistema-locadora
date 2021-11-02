export default async function getLocadoraInfo(section) {
  try {
    const response = await fetch(`http://localhost:3000/${section}`);
    const data = await response.json();
    return data;
  }
  catch {
    if(section === 'filme') {
      return [
        {
          "id_filme": 1,
          "titulo": "Gente Grande 1",
          "classificacao_indicativa": 4,
          "lancamento": "2010-09-24 00:00:00"
        },
        {
          "id_filme": 2,
          "titulo": "Invocação do Mal 3",
          "classificacao_indicativa": 1,
          "lancamento": "2021-06-03 00:00:00"
        }
      ];
    }
    if(section === 'cliente') {
      return [
        {
          "id_cliente": 1,
          "nome": "Lucas",
          "cpf": "12136545896",
          "data_nascimento": "2000-01-02 00:00:00"
        },
        {
          "id_cliente": 2,
          "nome": "Claudia",
          "cpf": "96587452145",
          "data_nascimento": "1990-08-08 00:00:00"
        },
        {
          "id_cliente": 3,
          "nome": "Vanessa",
          "cpf": "99874551236",
          "data_nascimento": "1986-07-15 00:00:00"
        }
      ];
    }
    if(section === 'locacao') {
      return [
        {
          "id_locacao": 1,
          "id_cliente": 2,
          "id_filme": 2,
          "data_locacao": "2021-09-16 13:45:32",
          "data_devolucao": "2021-09-18 13:45:32"
        }
      ];
    }
  }
}