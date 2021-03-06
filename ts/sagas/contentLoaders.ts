import { call, Effect, put, takeEvery } from "redux-saga/effects";

import { BasicResponseType } from "italia-ts-commons/lib/requests";

import { ContentClient } from "../api/content";

import { Service as ServiceMetadata } from "../../definitions/content/Service";

import { CONTENT_SERVICE_LOAD } from "../store/actions/constants";
import {
  ContentServiceLoad,
  contentServiceLoadFailure,
  contentServiceLoadSuccess
} from "../store/actions/content";

import { ServiceId } from "../../definitions/backend/ServiceId";
import { SagaCallReturnType } from "../types/utils";

const contentClient = ContentClient();

/**
 * Retrieves a service metadata from the static content repository
 */
function getServiceMetadata(
  serviceId: ServiceId
): Promise<BasicResponseType<ServiceMetadata> | undefined> {
  return new Promise((resolve, _) =>
    contentClient
      .getService({ serviceId })
      .then(resolve, () => resolve(undefined))
  );
}

/**
 * A saga that watches for and executes requests to load service metadata.
 *
 * TODO: do not retrieve the content on each request, rely on cache headers
 * https://www.pivotaltracker.com/story/show/159440224
 */
export function* watchContentServiceLoadSaga(): Iterator<Effect> {
  yield takeEvery(CONTENT_SERVICE_LOAD, function*(action: ContentServiceLoad) {
    const serviceId = action.serviceId;

    const response: SagaCallReturnType<typeof getServiceMetadata> = yield call(
      getServiceMetadata,
      serviceId
    );

    if (response && response.status === 200) {
      yield put(contentServiceLoadSuccess(serviceId, response.value));
    } else {
      yield put(contentServiceLoadFailure(serviceId));
    }
  });
}
