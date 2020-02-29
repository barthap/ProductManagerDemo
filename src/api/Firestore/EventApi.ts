import {ApiEventListener, ApiEventManager} from "../EventApi";
import firestore, {FirebaseFirestoreTypes} from "./firestoreProvider";
import auth from '@react-native-firebase/auth';

export type QueryDocSnapshot = FirebaseFirestoreTypes.QueryDocumentSnapshot;

//this automatically starts Firestore Snapshot listener,
//when first listener appears. And unsubscribe, when
//last listener is removed
export abstract class FirestoreEventManager<T> extends ApiEventManager<T[]> {
    private ref: FirebaseFirestoreTypes.CollectionReference;
    private unsubscribeFn?: () => void;

    protected abstract parseDoc(doc: QueryDocSnapshot): T;

    protected constructor(collection: string) {
        super();
        this.ref = firestore().collection(collection);
    }

    private startFirestoreListener() {
        console.log('Starting Firestore Listener');
        if(auth().currentUser == null) return;

        this.unsubscribeFn = this.ref
            .where('userID', '==', auth().currentUser.uid)
            .onSnapshot({
            next: (snapshot => {
                const result: T[] = snapshot.docs.map(doc => this.parseDoc(doc));
                this.emitEvent(result);
            })
        })
    }

    private stopFirestoreListener() {
        console.log('Stopping Firestore Listener');
        if(this.unsubscribeFn != null)
            this.unsubscribeFn();
    }

    addEventListener(listener: ApiEventListener<T[]>): number {
        if(this.listenerCount() == 0)
            this.startFirestoreListener();


        return super.addEventListener(listener);
    }

    removeEventListener(listenerId: number) {
        super.removeEventListener(listenerId);

        if(this.listenerCount() == 0)
            this.stopFirestoreListener();
    }

    public start() { } //does nothing when called, not needed

    public restart() {
        if(this.listenerCount() === 0) return;

        this.stopFirestoreListener();
        this.startFirestoreListener();
    }
}
