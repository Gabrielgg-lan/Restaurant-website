/**
 * Type definitions for the menu image categories and their respective images.
 * Maps each menu item ID to its image file path.
 */
export interface MenuImages {
  /** Food item images mapped by item ID */
  comidas: {
    /** Classic burger image */
    'classico': string
    /** BBQ bacon burger image */
    'bacon-bbq': string
    /** Cheese melt burger image */
    'cheese-melt': string
    /** Vegetarian burger image */
    'veggie': string
    /** Rustic potatoes image */
    'batatas-rusticas': string
    /** Onion rings image */
    'onion-rings': string
    /** Garlic bread image */
    'pao-alho': string
    /** French fries image */
    'fritas': string
    /** Coleslaw salad image */
    'coleslaw': string
  }
  /** Beverage images mapped by item ID */
  bebidas: {
    /** Soft drink image */
    'refri': string
    /** Natural juice image */
    'suco': string
    /** Beer image */
    'cerveja': string
    /** Mineral water image */
    'agua': string
  }
  /** Dessert images mapped by item ID */
  sobremesas: {
    /** Brownie with ice cream image */
    'brownie': string
    /** Cheesecake image */
    'cheesecake': string
  }
  /** Fallback placeholder image */
  placeholder: string
}

// Import das imagens de comida
import classicoBurger from './comidas/classico.jpg'
import baconBbq from './comidas/bacon-bbq.jpg'
import cheeseMelt from './comidas/cheese-melt.jpg'
import veggieBurger from './comidas/veggie-burger.jpg'
import batatusRusticas from './comidas/batatas-rusticas.jpg'
import onionRings from './comidas/onion-rings.jpg'
import paoDeAlho from './comidas/pao-de-alho.jpg'
import porcaoFritas from './comidas/porcao-fritas.jpg'
import coleslaw from './comidas/coleslaw.jpg'

// Import das imagens de bebida
import refrigeranteLata from './bebidas/refrigerante-lata.jpg'
import sucoNatural from './bebidas/suco-natural.jpg'
// Se faltar a imagem de alguma coisa, colocar o ./placeholder.jpg
import cervejaLongNeck from './bebidas/cerveja-long-neck.jpg'
import aguaMineral from './bebidas/agua-mineral.jpg'

// Import das imagens de sobremesa
import brownieSorvete from './sobremesas/brownie-sorvete.jpg'
import cheesecake from './sobremesas/cheesecake.jpg'

// Import do placeholder
import placeholder from './placeholder.jpg'

// Export organizado por categoria
export const images: MenuImages = {
  comidas: {
    'classico': classicoBurger,
    'bacon-bbq': baconBbq,
    'cheese-melt': cheeseMelt,
    'veggie': veggieBurger,
    'batatas-rusticas': batatusRusticas,
    'onion-rings': onionRings,
    'pao-alho': paoDeAlho,
    'fritas': porcaoFritas,
    'coleslaw': coleslaw
  },
  bebidas: {
    'refri': refrigeranteLata,
    'suco': sucoNatural,
    'cerveja': cervejaLongNeck,
    'agua': aguaMineral
  },
  sobremesas: {
    'brownie': brownieSorvete,
    'cheesecake': cheesecake
  },
  placeholder
}