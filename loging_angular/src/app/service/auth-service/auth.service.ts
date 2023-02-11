import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';

export interface Character {
    name: string;
    homeworld: string;
    species: string;
  }
  
  export interface CharacterDetail extends Character {
    height: number;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
  }
  
  export interface CharactersResult {
    count: number;
    characters: Character[];
  }
  
  export interface Species {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    skin_colors: string;
    hair_colors: string;
    eye_colors: string;
    average_lifespan: string;
    language: string;
    homeworld: string;
  }
  
  @Injectable({
    providedIn: 'root'
  })
export class AuthService {

    private charactersQuery: QueryRef<{characters: CharactersResult}, { offset: number}>;
  private findCharacterQuery: QueryRef<{character: CharacterDetail}, { name: string}>;
  private findSpeciesQuery: QueryRef<{species: Species}, { name: string}>;

  constructor(private apollo: Apollo) { 
    this.charactersQuery = this.apollo.watchQuery({
      query: gql`query characters($offset: Int!) {
        characters(offset: $offset) {
          count
          characters {
            name
            homeworld
            species
          }
        }
      }`
    });

    this.findCharacterQuery = this.apollo.watchQuery({
      query: gql`query character($name: String!) {
        character(name: $name) {
          name
          height
          mass
          hair_color
          skin_color
          eye_color
          birth_year
          gender
          homeworld
          species
        }
      }`
    });

    this.findSpeciesQuery = this.apollo.watchQuery({
      query: gql`query species($name: String!) {
        species(name: $name) {
          name
          classification
          designation
          average_height
          skin_colors
          hair_colors
          eye_colors
          average_lifespan
          language
          homeworld
        }
      }`
    });
  }
  async getCharacters(offset: number): Promise<CharactersResult> {
    const result = await this.charactersQuery.refetch({ offset });
    return result.data.characters;
  }

  async findCharacter(name: string): Promise<CharacterDetail> {
    const result = await this.findCharacterQuery.refetch({ name });
    return result.data.character;
  }

  async findSpecies(name: string): Promise<Species> {
    const result = await this.findSpeciesQuery.refetch({ name });
    return result.data.species;
  }

}
