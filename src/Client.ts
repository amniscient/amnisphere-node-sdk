/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "./environments";
import * as core from "./core";
import { Model } from "./api/resources/model/client/Client";
import { Detection } from "./api/resources/detection/client/Client";

export declare namespace AmniscientApiClient {
    export interface Options {
        environment?: core.Supplier<environments.AmniscientApiEnvironment | string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: core.Supplier<string>;
        /** Override the x-api-key header */
        apiKey: core.Supplier<string>;
    }

    export interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the x-api-key header */
        apiKey?: string;
        /** Additional headers to include in the request. */
        headers?: Record<string, string>;
    }
}

export class AmniscientApiClient {
    protected _model: Model | undefined;
    protected _detection: Detection | undefined;

    constructor(protected readonly _options: AmniscientApiClient.Options) {}

    public get model(): Model {
        return (this._model ??= new Model(this._options));
    }

    public get detection(): Detection {
        return (this._detection ??= new Detection(this._options));
    }
}
