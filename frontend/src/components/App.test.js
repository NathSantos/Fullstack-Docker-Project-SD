import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";

const cidades = [
  { _id: 1, title: "Cidade 1" },
  { _id: 2, title: "Cidade 2" },
  { _id: 3, title: "Cidade 3" },
];

const newCidade = { _id: 4, title: "Nova cidade" };

const apiEndpoint = "http://localhost:4001/api/cidades";

const server = setupServer(
  rest.get(apiEndpoint, (req, res, ctx) => res(ctx.json(cidades))),
  rest.post(apiEndpoint, (req, res, ctx) => res(ctx.json(newCidade))),
  rest.delete(apiEndpoint + "/" + cidades[0]._id, (req, res, ctx) =>
    res(ctx.status(204))
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Componente de aplicativo", () => {
  test("Renderiza todas as cidades buscadas no servidor", async () => {
    render(<App />);

    const listItems = await screen.findAllByRole("listitem");

    expect(listItems.length).toEqual(cidades.length);
  });

  test("Exibe um erro se a chamada para o servidor falhar", async () => {
    server.use(rest.get(apiEndpoint, (req, res, ctx) => res(ctx.status(500))));

    render(<App />);

    await screen.findByRole("alert");
  });

  describe("Quando uma nova cidade é adicionada", () => {
    test("O campo de entrada é limpo", async () => {
      await renderApp();

      addCidade();
      await screen.findByText(newCidade.title);

      const inputField = screen.getByLabelText("Nova Cidade");
      expect(inputField).toHaveValue("");
    });

    test("É adicionado à lista", async () => {
      await renderApp();

      addCidade();

      await screen.findByText(newCidade.title);
    });

    test("É removido da lista se a chamada para o servidor falhar", async () => {
      server.use(
        rest.post(apiEndpoint, (req, res, ctx) => res(ctx.status(500)))
      );

      await renderApp();

      addCidade();

      await waitForElementToBeRemoved(() => screen.queryByText(newCidade.title));
    });

    test("Um erro é exibido se a chamada para o servidor falhar", async () => {
      server.use(
        rest.post(apiEndpoint, (req, res, ctx) => res(ctx.status(500)))
      );

      await renderApp();

      addCidade();

      const error = await screen.findByRole("alert");
      expect(error).toHaveTextContent(/save/i);
    });
  });

  describe("Quando uma cidade é deletada", () => {
    test("É removido da lista", async () => {
      await renderApp();

      deleteCidade();

      expect(screen.queryByText(cidades[0].title)).not.toBeInTheDocument();
    });

    test("É reinserido na lista se a chamada para o servidor falhar", async () => {
      server.use(
        rest.delete(apiEndpoint + "/" + cidades[0]._id, (req, res, ctx) =>
          res(ctx.status(500))
        )
      );

      await renderApp();

      deleteCidade();

      await screen.findByText(cidades[0].title);
    });

    test("Um erro é exibido se a chamada para o servidor falhar", async () => {
      server.use(
        rest.delete(apiEndpoint + "/" + cidades[0]._id, (req, res, ctx) =>
          res(ctx.status(500))
        )
      );

      await renderApp();

      deleteCidade();

      const error = await screen.findByRole("alert");
      expect(error).toHaveTextContent(/delete/i);
    });
  });
});

// Helper functions
const renderApp = async () => {
  render(<App />);
  await screen.findAllByRole("listitem");
};

const addCidade = () => {
  const inputField = screen.getByLabelText("Novo Filme");
  fireEvent.change(inputField, {
    target: { value: newCidade.title },
  });
  fireEvent.submit(inputField);
};

const deleteCidade = () => fireEvent.click(screen.getAllByRole("button")[0]);
