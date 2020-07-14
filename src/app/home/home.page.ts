import { Component, ViewChild, Renderer2 } from '@angular/core';
import { AnimationController, Animation, Platform, Gesture, GestureController, GestureDetail } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public initialSteps :number = 0;
  public maxTranslate :number = 0;
  private animation : Animation;
  private gesture: Gesture;
  public swiping: boolean;


  @ViewChild('blocks') blocks: any; 
  @ViewChild('background') background: any;
  @ViewChild('swipeDown') swipeDown: any;
  

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

  constructor(
    private animationCtrl:AnimationController, 
    private platform:Platform,  
    private renderer : Renderer2,
    private gestureCrtl:GestureController
    ) {
    this.maxTranslate = this.platform.height() - 200
  }

  ngAfterViewInit() {
    
    this.createAnimation();
    this.detectSwipe();
  }

  toggleBlocks(){

    this.initialSteps = this.initialSteps === 0 ? this.maxTranslate : 0;
    this.gesture.enable(false);
    this.animation.direction(this.initialSteps === 0 ? 'reverse':'normal').play();
    this.setBackgroundOpacity();
  }

  createAnimation(){
    this.animation= this.animationCtrl.create()
    .addElement(this.blocks.nativeElement)//acessando componente nativo no html5
    .duration(300)
    .fromTo(`transform`,`translateY(0)`,`translateY(${this.maxTranslate}px)`)
    .onFinish( () => this.gesture.enable(true));
  }

  setBackgroundOpacity(value:number = null){

    let posicao_inicial = this.initialSteps === 0 ? "0" : "1";
    this.renderer.setStyle(this.background.nativeElement,'opacity', value ? value : posicao_inicial  );
  }

  fixedBlocks():boolean{
    return this.swiping || this.initialSteps === this.maxTranslate;
  }

  detectSwipe(){
    this.gesture = this.gestureCrtl.create({
      el:this.swipeDown.el, //acessando componente nativo do 'ionc'
      gestureName:'swipe-donw',
      threshold:0,
      onMove : env => this.onMove(env),
      onEnd : env => this.onEnd(env) 
    },true);//excuta componentes em topo de excução para compomentes que estejam fora da zona do angular
     
    this.gesture.enable(true);
  }

  onMove(env: GestureDetail){
    if(!this.swiping){
      this.animation.direction('normal').progressStart(true);
      this.swiping = true;
    }

    const step:  number = this.getStep(env);
    this.animation.progressStep(step);
    this.setBackgroundOpacity(step);
  }

  getStep(env: GestureDetail){
    const delta: number = this.initialSteps + env.deltaY;
    return delta /this.maxTranslate;
  }

  onEnd(env: GestureDetail){

    if(!this.swiping) return;
    
    this.gesture.enable(false);
    const step:  number = this.getStep(env);
    const shouldComplete:boolean = step > 0.5;
    this.animation.progressEnd(shouldComplete ? 1:0,step);
    this.initialSteps = shouldComplete ? this.maxTranslate:0; 
    this.setBackgroundOpacity();
    this.swiping = false;
  }



}
