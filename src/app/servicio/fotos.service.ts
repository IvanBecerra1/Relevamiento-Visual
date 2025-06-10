import { inject, Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { AutenticacionService } from './autenticacion.service';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { query, orderBy, getDocs } from 'firebase/firestore';
import { doc, getDoc, setDoc, updateDoc, increment,deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class FotosService {
  
  private firestore : Firestore = inject(Firestore);
  constructor(private storage: Storage,
              private auth : AutenticacionService
  ) {}

  async toggleVoto(fotoId: string): Promise<'votado' | 'quitado'> {
    const uid = await this.auth.getCurrentUserIdAsync();
    if (!uid) return 'quitado';
  
    const votoRef = doc(this.firestore, `fotos/${fotoId}/votos/${uid}`);
    const fotoRef = doc(this.firestore, `fotos/${fotoId}`);
    const votoSnap = await getDoc(votoRef);
  
    if (votoSnap.exists()) {
      // ❌ Ya había votado → Quitar voto
      await deleteDoc(votoRef);
      await updateDoc(fotoRef, { votos: increment(-1) });
      return 'quitado';
    } else {
      // ✅ No había votado → Agregar voto
      await setDoc(votoRef, { votado: true });
      await updateDoc(fotoRef, { votos: increment(1) });
      return 'votado';
    }
  }
async usuarioYaVoto(fotoId: string): Promise<boolean> {
  const uid = await this.auth.getCurrentUserIdAsync();
  if (!uid) return false;

  const votoRef = doc(this.firestore, `fotos/${fotoId}/votos/${uid}`);
  const votoSnap = await getDoc(votoRef);
  return votoSnap.exists();
}

async votarFoto(fotoId: string) {
  const uid = await this.auth.getCurrentUserIdAsync();
  if (!uid) return;

  const votoRef = doc(this.firestore, `fotos/${fotoId}/votos/${uid}`);
  const fotoRef = doc(this.firestore, `fotos/${fotoId}`);

  await setDoc(votoRef, { votado: true });
  await updateDoc(fotoRef, {
    votos: increment(1)
  });
}

  async obtenerFotosPorTipo(tipo: 'linda' | 'fea') {
    const ref = collection(this.firestore, 'fotos');
    const q = query(ref, orderBy('fecha', 'desc'));

    const snapshot = await getDocs(q);
    const fotos = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((foto: any) => foto.tipo === tipo);

    return fotos;
  }
  
  async tomarYSubirFoto(tipo: 'linda' | 'fea') {
    try {
      // 1. Tomar foto
      const foto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 80
      });

      const nombreArchivo = `fotos/${Date.now()}.jpg`;
      const storageRef = ref(this.storage, nombreArchivo);

      const fotoBase64 = foto.base64String!;
      const fotoBinaria = this.base64ToBlob(fotoBase64, 'image/jpeg');

      // 2. Subir al storage
      await uploadBytes(storageRef, fotoBinaria);
      const url = await getDownloadURL(storageRef);

      // 3. Subir info a Firestore
      const uid = await this.auth.getCurrentUserIdAsync();

      if (uid) {
        const docRef = collection(this.firestore, 'fotos');
        await addDoc(docRef, {
          uid: uid,
          url: url,
          tipo: tipo,
          fecha: serverTimestamp(),
          votos: 0
        });
        console.log('✅ Foto subida y registrada correctamente');
        return true;
      } else {
        throw new Error('Usuario no autenticado');
      }

    } catch (err) {
      console.error('❌ Error al subir la foto:', err);
      return false;
    }
  }

  private base64ToBlob(base64: string, tipo: string) {
    const byteString = atob(base64);
    const array = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      array[i] = byteString.charCodeAt(i);
    }
    return new Blob([array], { type: tipo });
  }
}