import { skillTypeId } from "@app/enums/skillTypeId";

export class memberRequest {
    name: string;
    rank: string;
    designation: string;
    organization: string;
    placeOfBirth: string;
    currentLocation: string;
    skills: string[] | skillTypeId[];
    weapons: string[];
    devilFruits: string[];
    bounty: number;
  
    constructor(name: string, rank: string, designation: string, organization: string, placeOfBirth: string, 
        currentLocation: string, skills: string[] | skillTypeId[], weapons: string[], devilFruits: string[], bounty: number){
      this.name = name;
      this.rank = rank;
      this.designation = designation;
      this.organization = organization;
      this.placeOfBirth = placeOfBirth;
      this.currentLocation = currentLocation;
      this.skills = skills;
      this.weapons = weapons;
      this.devilFruits = devilFruits;
      this.bounty = bounty;
    }
  }
  