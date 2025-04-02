import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonasService } from './services/personas.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatePipe, NgFor } from '@angular/common';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { VerComponent } from './modal/ver/ver.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule,DatePipe,NgFor,ReactiveFormsModule,MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Efecty';
  personas : any[] = [];
  isCreate : boolean = false;
  formPersona! : UntypedFormGroup;
  TipoDoc : any[] = [{id : 1, descripcion : "Cedula"},{id : 2, descripcion : "Tarjeta Identidad"}];
  estadoCivil : any[] = [{id : 1, descripcion : "Casado"},{id : 2, descripcion : "Soltero"},{id : 3, descripcion : "Union libre"}];
  constructor(private service : PersonasService,public dialog: MatDialog){ }
  ngOnInit(): void {
    this.getAll();
    this.InitFormPersona();
  }
  getAll(){
    this.service.GetAll().forEach(x =>{
      this.personas = x;
      console.log(x)
    });
  }
  Eliminar(element : any){
    let result : boolean = confirm("Deseas eliminar la persona : " + element.name + " " + element.lastName);
    if(result){
      this.service.Delete(element.id).subscribe(x =>{ this.getAll() });
    }
  }
  Ver(element : any){
    let dialogRef = this.dialog.open(VerComponent, {
      width: "300%",
      height: "60%",
      disableClose: false,
      data: {
        element: element,
        TipoDoc : this.TipoDoc,
        estadoCivil : this.estadoCivil
      },
    });
    dialogRef.afterClosed().subscribe(confirmresult => {this.getAll()}); 
  }
  Crear(){
    this.InitFormPersona();
    this.isCreate = true;
    
  }
  Atras(){
    this.isCreate = false;
  }
  seleccionarOpcion(value : number ){
    this.formPersona.controls['estadoCivil'].setValue(value);
  }
  onSubmit(){
    console.log(this.formPersona.value);
    if(this.formPersona.controls['tipoDocumento'].value == 0 )
      alert("campo tipo documento requerido");
    else if(this.formPersona.controls['name'].value == "" || this.formPersona.controls['name'].value == null)
      alert("campo nombre requerido");
    else if(this.formPersona.controls['lastName'].value == "" || this.formPersona.controls['lastName'].value == null)
      alert("campo apellido requerido");
    else if(this.formPersona.controls['birthDate'].value == "" || this.formPersona.controls['birthDate'].value == null)
      alert("campo fecha nacimiento requerido");
    else if(this.formPersona.controls['valueGain'].value == "" || this.formPersona.controls['valueGain'].value == null )
      alert("campo valor ganado requerido");
    else if(this.formPersona.controls['valueGain'].value <= 0 )
      alert("campo valor ganado no puede ser menor que cero");
    this.formPersona.controls['tipoDocumento'].setValue(Number(this.formPersona.controls['tipoDocumento'].value))
    this,this.service.Crear(this.formPersona.value).subscribe(x => {
      if(x){
        this.isCreate = false;
        this.getAll();
      }
      else{
        alert("Algo a sucedido");
      }
    })
  }
  InitFormPersona() {
    this.formPersona = new UntypedFormGroup({
      name : new UntypedFormControl(""),
      lastName : new UntypedFormControl(""),
      birthDate : new UntypedFormControl(""),
      valueGain : new UntypedFormControl(""),
      tipoDocumento : new UntypedFormControl(0),
      estadoCivil : new UntypedFormControl(2), 
    });
  }
}
