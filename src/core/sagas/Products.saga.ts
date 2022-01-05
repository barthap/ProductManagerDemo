import { all, put, takeEvery, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { productConstants } from '../constants/Products.constants';
import {
  AddProductAction,
  DeleteProductAction,
  productsActions,
  UpdateProductAction,
} from '../actions/Products.actions';
import { messageBoxActions } from '../actions/MessageBox.actions';
import { ProductsApi as Api, ProductEventManager as eventManager } from '../../api';
import { ProductCollectionListener } from '../../api/Firestore/ProductApi';
import i18n from '../../i18n';

//Event-based api automatically loads data, so most of the time this is not needed
//See startApiEventListener() saga
const watchLoadProducts = function* () {
  yield takeEvery(productConstants.LOAD_PRODUCTS, function* (): Generator {
    yield put(productsActions.loadProductsPending());
    //if(Api.supportsEvents) return;
    console.log('Loading products manually...');
    try {
      const result: any = yield Api.getProductList().catch((e) => {
        throw e;
      });
      yield put(productsActions.loadProductsSuccess(result));
      yield put(messageBoxActions.show(i18n.t('alerts.load_success'), 'success', false, 2000));
    } catch (e) {
      console.warn('Error when loading products', e);
      yield put(messageBoxActions.show(i18n.t('alerts.load_fail'), 'error'));
      yield put(productsActions.loadProductsFailure());
    }
  });
};

const watchAddProduct = function* () {
  yield takeEvery(productConstants.ADD_PRODUCT, function* (action: AddProductAction) {
    yield put(productsActions.productCrudPending());
    try {
      yield Api.addProduct(action.payload).catch((e) => {
        throw e;
      });
      yield put(productsActions.productCrudSuccess());
      yield put(
        messageBoxActions.show(
          i18n.t('alerts.add_success', { name: action.payload.name }),
          'success',
          true,
          3000
        )
      );

      if (!Api.supportsEvents)
        //we need to do reload manually
        yield put(productsActions.loadProducts()); //should it go this way?
      //a better way would be to create actions that locally update the store
      //instead of calling api again, but this solution is simpler and closer to event-based one
    } catch (e) {
      console.warn('Error when adding product', e);
      yield put(messageBoxActions.show(i18n.t('alerts.add_fail'), 'error'));
      yield put(productsActions.productCrudFailure());
    }
  });
};

const watchUpdateProduct = function* () {
  yield takeEvery(productConstants.UPDATE_PRODUCT, function* (action: UpdateProductAction) {
    try {
      yield Api.updateProduct(action.payload).catch((e) => {
        throw e;
      });
      console.log('Updated product ', action.payload);
      yield put(
        messageBoxActions.show(
          i18n.t('alerts.update_success', { name: action.payload.name }),
          'success',
          true,
          3000
        )
      );

      if (!Api.supportsEvents)
        //we need to do reload manually
        yield put(productsActions.loadProducts()); //should it go this way?
      //a better way would be to create actions that locally update the store
      //instead of calling api again, but this solution is simpler and closer to event-based one
    } catch (e) {
      console.warn('Error when updating product', e);
      yield put(messageBoxActions.show(i18n.t('alerts.update_fail'), 'error'));
    }
  });
};

const watchDeleteProduct = function* () {
  yield takeEvery(productConstants.DELETE_PRODUCT, function* (action: DeleteProductAction) {
    try {
      yield Api.removeProduct(action.payload).catch((e) => {
        throw e;
      });
      console.log('Deleted product ', action.payload);
      yield put(messageBoxActions.show(i18n.t('alerts.delete_success'), 'info', true, 3000));

      if (!Api.supportsEvents)
        //we need to do reload manually
        yield put(productsActions.loadProducts()); //should it go this way?
      //a better way would be to create actions that locally update the store
      //instead of calling api again, but this solution is simpler and closer to event-based one
    } catch (e) {
      console.warn('Error when deleting product', e);
      yield put(messageBoxActions.show(i18n.t('alerts.delete_fail'), 'error'));
    }
  });
};

//this should listen to api events and put actions to store
function* startApiEventListener() {
  const channel = eventChannel((emitter) => {
    console.log('Creating saga event channel...');
    const listener: ProductCollectionListener = {
      onEvent: (event) => {
        emitter({ data: event || [] });
      },
    };
    const listenerId = eventManager.addEventListener(listener);

    return () => {
      console.log('Removing saga event channel...');
      eventManager.removeEventListener(listenerId);
    };
  });

  while (true) {
    const { data } = yield take(channel);
    //console.log('Saga took event:', data);
    yield put(productsActions.loadProductsSuccess(data));
  }
}

const watchApiEvents = function* () {
  if (Api.supportsEvents) yield fork(startApiEventListener);
};

export function* productsSaga() {
  yield all([
    watchLoadProducts(),
    watchAddProduct(),
    watchUpdateProduct(),
    watchDeleteProduct(),
    watchApiEvents(),
  ]);
}
