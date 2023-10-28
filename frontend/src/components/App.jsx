import React, { useState, useEffect } from "react";
import TurismoForm from "./TurismoForm";
import TitleForm from "./TitleForm";
import TurismoList from "./TurismoList"
import api from "../services/api";
import "./App.css";

function App() {
  const cidadesEndpoint = "/cidades";
  const paisesEndpoint = "/paises";
  const compareEndpoint = "/compare";
  const [searchResult, setSearchResult] = useState("");
  const [cidades, setCidades] = useState([]);
  const [paises, setPaises] = useState([]);
  const [error, setError] = useState();

  const fetchCidades = async () => {
    try {
      const { data } = await api.get(cidadesEndpoint);
      setCidades(data);
    } catch (error) {
      setError("Não foi possível buscar as cidades!");
    }
  };
  const fetchPaises = async () => {
    try {
      const { data } = await api.get(paisesEndpoint);
      setPaises(data);
    } catch (error) {
      setError("Não foi possível buscar os países!");
    }
  };

  const handleAddCidade = async (title) => {
    try {
      const cidade = { _id: Date.now(), title };
      setCidades([...cidades, cidade]);

      const { data: savedCidade } = await api.create(cidadesEndpoint, cidade);

      setCidades([...cidades, savedCidade]);
    } catch (error) {
      setError("Não foi possível salvar a cidade!");
      setCidades(cidades);
    }
  };

  const titleSearch = async (title) => {
    if (title === ""){
      setSearchResult({
        cidade: null,
        pais: null
      });
      return;
    }
    try {
      const { data } = await api.get(compareEndpoint+"/"+title);
      setSearchResult(data);
    } catch (error) {
      console.log("Não foi possível buscar as cidades!");
    }
  };

  const handleAddPais = async (title) => {
    try {
      const pais = { _id: Date.now(), title };
      setPaises([...paises, pais]);

      const { data: savedPais } = await api.create(paisesEndpoint, pais);

      setPaises([...paises, savedPais]);
    } catch (error) {
      setError("Não foi possível salvar o país!");
      setPaises(paises);
    }
  };

  const handleDeleteCidade = async (cidade) => {
    try {
      setCidades(cidades.filter((m) => m !== cidade));
      await api.remove(cidadesEndpoint + "/" + cidade._id);
    } catch (error) {
      setError("Não foi possível excluir a cidade!");
      setCidades(cidades);
    }
  };

  const handleDeletePais = async (pais) => {
    try {
      setPaises(paises.filter((s) => s !== pais));
      await api.remove(paisesEndpoint + "/" + pais._id);
    } catch (error) {
      setError("Não foi possível excluir o país!");
      setPaises(paises);
    }
  };

  useEffect(() => {
    fetchCidades();
    fetchPaises();
  }, []);

  return (
    <div className="App">
      <div className="compareContainer">
        <h1>Consulte uma cidade ou um país desejado:</h1>
        <TitleForm onSearchTitle={titleSearch} searchResult={searchResult} />
        {error && (
          <p role="alert" className="Error">
            {error}
          </p>
        )}
      </div>
      <div className="cidadesEpaisesContainer">
        <div className="cidadeContainer">
          <h1>Cidades</h1>
          <TurismoForm onAddTurismo={handleAddCidade} placeholder="Adicione a cidade" />
          {error && (
            <p role="alert" className="Error">
              {error}
            </p>
          )}
          <TurismoList turismos={cidades} onDeleteTurismo={handleDeleteCidade} type="CidadeItem" />
        </div>
        <div className="paisesContainer">
          <h1>Países</h1>
          <TurismoForm onAddTurismo={handleAddPais} placeholder="Adicione o país" />
          {error && (
            <p role="alert" className="Error">
              {error}
            </p>
          )}
          <TurismoList turismos={paises} onDeleteTurismo={handleDeletePais} type="PaisItem"/>
        </div>
      </div>
    </div>
  );
}

export default App;
