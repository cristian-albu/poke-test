"use client";
import { Container, Section } from "@/components/layout";
import Image from "next/image";
import { Pokemon } from "pokenode-ts";
import React, { FC } from "react";

export type T_PokemonView = {
  data: Pokemon;
};

const PokemonView: FC<T_PokemonView> = ({ data }) => {
  console.log(data);
  return (
    <Section>
      <Container>
        <Image
          width={100}
          height={100}
          src={data.sprites.front_default || "/pokemon_ball.png"}
          alt={data.name}
          priority
        />
        <h1 className="capitalize text-5xl">{data.name}</h1>
        <div>
          <p>Weight: {data.weight}</p>

          <div className="flex gap-1 items-center">
            <p>Type: </p>
            {data.types.map((type) => (
              <p key={type.type.name} className="bg-gray-100 p-1 rounded-md">
                {type.type.name}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl">Stats:</h2>
          {data.stats.map((stat) => (
            <div key={stat.stat.name}>
              <p>
                {stat.stat.name}:{stat.base_stat}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default PokemonView;
