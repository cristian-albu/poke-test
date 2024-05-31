import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import HomeView, { T_PokemonResource } from "./HomeView";
import FilterContextProvider from "@/components/filter/filterContext";

const initialData: T_PokemonResource[] = [
  { pokemon: { name: "charizard", url: "" }, type: "fire" },
  { pokemon: { name: "bulbasaur", url: "" }, type: "nature, poison" },
  { pokemon: { name: "squirtle", url: "" }, type: "water" },
  { pokemon: { name: "ekans", url: "" }, type: "poison" },
  { pokemon: { name: "oddish", url: "" }, type: "nature" },
];

const types = ["fire", "nature", "water", "poison"];

describe("Home view", () => {
  test("Renders content", () => {
    render(
      <FilterContextProvider>
        <HomeView initialData={initialData} types={types} />
      </FilterContextProvider>
    );
    const content = screen.getByRole("heading", { level: 1 });

    expect(content).toBeInTheDocument();
  });

  test("Filter component works as expected", () => {
    render(
      <FilterContextProvider>
        <HomeView initialData={initialData} types={types} />
      </FilterContextProvider>
    );

    const pokemons = screen.getAllByRole("link");

    expect(pokemons.length).toBe(5);
    const filterBtn = screen.getByRole("button", { name: "Filter" });

    // open filter modal
    fireEvent.click(filterBtn);

    const inputs = screen.getAllByRole("checkbox");

    const firstCheckbox = inputs[0];

    expect(firstCheckbox).toHaveAccessibleName(types[0]);

    expect(firstCheckbox).not.toBeChecked();

    fireEvent.click(firstCheckbox);

    expect(firstCheckbox).toBeChecked();

    const applyBtn = screen.getByRole("button", { name: "Apply filters" });

    expect(applyBtn).toBeInTheDocument();

    fireEvent.click(applyBtn);

    const pokemonsAfterFilter = screen.getAllByRole("link");

    expect(pokemonsAfterFilter.length).toBe(1);
  });

  test("Search component works as expected", async () => {
    render(
      <FilterContextProvider>
        <HomeView initialData={initialData} types={types} />
      </FilterContextProvider>
    );

    const pokemons = screen.getAllByRole("link");

    expect(pokemons.length).toBe(5);

    const searchbar = screen.getByRole("textbox");
    const searchBtn = screen.getByRole("button", { name: "input button" });
    expect(searchbar).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    fireEvent.change(searchbar, { target: { value: "cha" } });
    expect(searchbar).toHaveValue("cha");
    fireEvent.click(searchBtn);

    const pokemonsAfterSearch = screen.getAllByRole("link");
    expect(pokemonsAfterSearch.length).toBe(1);
  });

  test("Search and filter work together", () => {
    render(
      <FilterContextProvider>
        <HomeView initialData={initialData} types={types} />
      </FilterContextProvider>
    );

    const pokemons = screen.getAllByRole("link");

    expect(pokemons.length).toBe(5);

    const searchbar = screen.getByRole("textbox");
    const searchBtn = screen.getByRole("button", { name: "input button" });

    const filterBtn = screen.getByRole("button", { name: "Filter" });

    // open filter modal
    fireEvent.click(filterBtn);
    const inputs = screen.getAllByRole("checkbox");
    const applyBtn = screen.getByRole("button", { name: "Apply filters" });

    inputs.forEach((checkbox) => expect(checkbox).not.toBeChecked());

    fireEvent.click(inputs[1]);
    fireEvent.click(inputs[3]);

    expect(inputs[1]).toBeChecked();
    expect(inputs[3]).toBeChecked();

    fireEvent.click(applyBtn);

    const pokemonsAfterFilter = screen.getAllByRole("link");
    expect(pokemonsAfterFilter.length).toBe(3);

    fireEvent.change(searchbar, { target: { value: "bul" } });
    expect(searchbar).toHaveValue("bul");
    fireEvent.click(searchBtn);

    const pokemonsAfterFilterAndSearch = screen.getAllByRole("link");
    expect(pokemonsAfterFilterAndSearch.length).toBe(1);
  });
});
