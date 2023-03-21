import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('produits')
@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) { }



  /* POUR ENREGISTRER UN NOUVEAU PRODUIT */

  @Post()
  async create(@Body() createProduitDto: CreateProduitDto) {

    try {

      const produit = await this.produitsService.create(createProduitDto);
      return {
        statusCode: 200,
        message: `${createProduitDto.name} a bien été enregistré`, /* Concatenation d'une variable dans un string littéral pour écrire le pseudo */
        data: produit,
      };

    } catch (err) {
      return {
        statusCode: 500,
        message: 'Erreur serveur.',
        data: undefined,
      }
    }
  }



  /* POUR TROUVER TOUS LES PRODUITS */

  @Get()
  async findAll() {

    try {
      const produits = await this.produitsService.findAllProduits();

      if (!produits[0])

        throw new NotFoundException("Aucun produit existant.");

      return {
        statusCode: 200,
        message: 'Produits trouvés.',
        data: produits,
      };

    } catch (err) {
      return {
        statusCode: 500,
        message: 'Erreur serveur.',
        data: undefined,
      }
    }
  }



  /* POUR TROUVER UN PRODUIT */

  @Get(':id')
  async findOneById(@Param('id') id: string) {

    const data = await this.produitsService.findOneById(+id); /*modifie l'id de string en number avec + */

    try {
      if (!data) {
        return {
          statusCode: 404,
          message: "Le produit demandé n'existe pas.",
          data: undefined,
        };
      }

      if (data) {
        return {
          statusCode: 200,
          message: 'Produit trouvé.',
          data: data,
        };
      }

    } catch (err) {
      return {
        statusCode: 500,
        message: 'Erreur serveur.',
        data: undefined,
      };
    }
  }



  /* POUR MODIFIER UN PRODUIT */

  @Patch(':id')
  async updateProduit(@Param('id') id: string, @Body() updateProduitDto: UpdateProduitDto) {

    /* const produit = await this.produitsService.findOneById(+id);
    if (produit) {
      produit.name = updateProduitDto.name
      produit.price = updateProduitDto.price
      produit.quantity = updateProduitDto.quantity
      return await produit.save()
    } */

    const data = await this.produitsService.updateProduit(+id, updateProduitDto)

    if (!data) {
      throw new NotFoundException("Ce produit n'existe pas.")
    }
    return {
      statusCode: 200,
      message: "Le produit a bien été modifié.",
      data: data
    }
  }



  /* POUR SUPPRIMER UN PRODUIT */

  @Delete(':id')
  async removeProduit(@Param('id') id: string) {

    const produit = await this.produitsService.findOneById(+id);

    if (produit) {
      return {
        statusCode: 200,
        message: "Le produit a bien été supprimé.",
        data: (await this.produitsService.removeProduit(+id))
      }
    }

    throw new NotFoundException("Ce produit n'existe pas")
  }
}
