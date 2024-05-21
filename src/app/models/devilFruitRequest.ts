import { devilFruitTypeId } from "@app/enums/devilFruitTypeId";

export class devilFruitRequest {
    name: string;
    devilFruitType: string | devilFruitTypeId;
    isManMade: boolean;
  
    constructor(name: string, devilFruitType: string | devilFruitTypeId, isManMade: boolean){
      this.name = name;
      this.devilFruitType = devilFruitType;
      this.isManMade = isManMade;
    }
  }
  