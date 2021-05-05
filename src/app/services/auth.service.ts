import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth,
               private firestore: AngularFirestore ) { }

  initAuthListener(){

    this.auth.authState.subscribe( fuser => {
      console.log( fuser );
      console.log( fuser?.uid );
      console.log( fuser?.email );
    } )

  }

  createUser( name: string, email: string, password: string ){

    return this.auth.createUserWithEmailAndPassword( email, password )
      .then(({ user }) => {

        const newUser = new Usuario( user!.uid, name, email );

        return this.firestore.doc(`${user?.uid}/usuario`).set( {...newUser} );

      })

  }

  singInUser( email: string, password: string ){

    return this.auth.signInWithEmailAndPassword( email, password )

  }

  logOut(){

    return this.auth.signOut();

  }

  isAuth(){

    return this.auth.authState.pipe(
      map( fbUser => fbUser != null )
    );

  }

}
