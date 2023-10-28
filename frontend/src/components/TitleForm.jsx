import React, { useEffect, useState } from "react";
import Input from "./Input";
import "./TitleForm.css";

function TitleForm({onSearchTitle, searchResult}) {
  const [title, setTitle] = useState("");
  const handleChange = (e) => setTitle(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    onSearchTitle(title);
  };
  var response = ""
  if(searchResult.cidade && searchResult.pais == null){
    response = (
      <span>
        O item <span className="highlight">{searchResult.cidade.title}</span> está presente no pacote de turismo de <span className="highlight">cidades</span>.
      </span>
    );
  }else if(searchResult.pais && searchResult.cidade == null){
    response = (
      <span>
        O item <span className="highlight">{searchResult.pais.title}</span> está presente no pacote de turismo de <span className="highlight">países</span>.
      </span>
    );
  }else if(searchResult.cidade && searchResult.pais){
    response = (
      <span>
        O item <span className="highlight">{searchResult.cidade.title}</span> está presente tanto no pacote de turismo de <span className="highlight">cidades</span> quanto de <span className="highlight">países</span>.
      </span>
    );
  }else{
    response = (
      <span>
        O item <span className="highlight">{title}</span> não está presente no pacote de turismo!
      </span>
    );
  }

  useEffect(()=>onSearchTitle(title), [title]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
        aria-label="Pesquisa no Banco"
        onChange={handleChange}
        placeholder="Consulte um item"
        type="text"
        />
      </form>
      <h3>
        {response}
      </h3>
    </div>
  )
}

export default TitleForm;