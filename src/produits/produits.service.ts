import { Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';

@Injectable()
export class ProduitsService {



  /* POUR ENREGISTRER UN NOUVEAU PRODUIT VIA CONTROLLEUR */

  async create(createProduitDto: CreateProduitDto) {
    const produit = await Produit.create({ ...createProduitDto }).save();
    return produit;
  }



  /* POUR TROUVER TOUS LES PRODUITS */

  async findAllProduits(): Promise<Produit[] | undefined> {
    const produits = await Produit.find();
    return produits;
  }



  /* POUR TROUVER UN PRODUIT */

  async findOneById(id: number): Promise<Produit | undefined> {
    const produit = await Produit.findOneBy({ id })
    if (produit) {
      return produit;
    }
    return undefined
  }



  /* POUR MODIFIER UN PRODUIT */

  async updateProduit(id: number, updateProduitDto: UpdateProduitDto): Promise<Produit | null> {
    const produit = await Produit.findOneBy({ id });
    if (produit !== null) {
      produit.name = updateProduitDto.name
      produit.price = updateProduitDto.price
      produit.quantity = updateProduitDto.quantity
      return await produit.save()
    }
    return null;
  }



  /* POUR SUPPRIMER UN PRODUIT */

  async removeProduit(id: number): Promise<Produit | null> {
    const produit = await this.findOneById(id);
    if (produit !== null) await produit.remove();
    return produit
  }
}
