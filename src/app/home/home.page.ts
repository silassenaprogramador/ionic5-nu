import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /**
   * Links do Rodape
   */
  public options: Array<any> = [
    {icon:'person-add-outline',text:'Indicar Amigos'},
    {icon:'phone-portrait-outline',text:'Recarga de celular'},
    {icon:'wallet-outline',text:'Depositar'},
    {icon:'options-outline',text:'Ajustar Limite'},
    {icon:'help-circle-outline',text:'Me ajuda'},
    {icon:'barcode-outline',text:'Pagar'},
    {icon:'lock-open-outline',text:'Bloquear cartão'},
    {icon:'card-outline',text:'Cartão Virtual'}
  ];

  /***
   * permite arrastar 3 slides por vez
   * permite que a forma de arrastar acompanhe o velocidade do dedo ao invez
   * de arrastar em uma velocidade padrão
   */
  public slidesOptions: any = {slidesPerView:3, freeMode:true};
  
  /**
   * Links do Conteudo
   */
  public itens: Array<any> = [
    {icon:'help-circle-outline',text:'Me ajuda'},
    {icon:'person-outline',text:'Perfil'},
    {icon:'cash-outline',text:'Configurar Conta'},
    {icon:'card-outline',text:'Configurar Cartão'},
    {icon:'phone-portrait-outline',text:'Configurações do App'}
  ];

  constructor() {}

}
