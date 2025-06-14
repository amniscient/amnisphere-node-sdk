/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "./environments";
import * as core from "./core";
import * as AmniscientApi from "./api/index";
import * as serializers from "./serialization/index";
import urlJoin from "url-join";
import * as errors from "./errors/index";
import * as fs from "fs";
import { Blob } from "buffer";

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
    constructor(protected readonly _options: AmniscientApiClient.Options) {}

    /**
     * Initializes a model for inference. This endpoint must be called before running any detections.
     *
     * @param {string} modelId - The model ID of an active and trained AI model within your organization
     * @param {AmniscientApi.LoadModelRequest} request
     * @param {AmniscientApiClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link AmniscientApi.BadRequestError}
     * @throws {@link AmniscientApi.UnauthorizedError}
     *
     * @example
     *     await client.loadModel("model_id", {
     *         organizationId: "organization_id"
     *     })
     */
    public loadModel(
        modelId: string,
        request: AmniscientApi.LoadModelRequest,
        requestOptions?: AmniscientApiClient.RequestOptions,
    ): core.HttpResponsePromise<string[]> {
        return core.HttpResponsePromise.fromPromise(this.__loadModel(modelId, request, requestOptions));
    }

    private async __loadModel(
        modelId: string,
        request: AmniscientApi.LoadModelRequest,
        requestOptions?: AmniscientApiClient.RequestOptions,
    ): Promise<core.WithRawResponse<string[]>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.AmniscientApiEnvironment.Default,
                `load-model/${encodeURIComponent(modelId)}`,
            ),
            method: "POST",
            headers: {
                "x-api-key": await core.Supplier.get(this._options.apiKey),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "amniscient",
                "X-Fern-SDK-Version": "0.0.2",
                "User-Agent": "amniscient/0.0.2",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.LoadModelRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return {
                data: serializers.loadModel.Response.parseOrThrow(_response.body, {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    breadcrumbsPrefix: ["response"],
                }),
                rawResponse: _response.rawResponse,
            };
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new AmniscientApi.BadRequestError(_response.error.body, _response.rawResponse);
                case 401:
                    throw new AmniscientApi.UnauthorizedError(
                        serializers.UnauthorizedErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                        _response.rawResponse,
                    );
                default:
                    throw new errors.AmniscientApiError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                        rawResponse: _response.rawResponse,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.AmniscientApiError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                    rawResponse: _response.rawResponse,
                });
            case "timeout":
                throw new errors.AmniscientApiTimeoutError(
                    "Timeout exceeded when calling POST /load-model/{model_id}.",
                );
            case "unknown":
                throw new errors.AmniscientApiError({
                    message: _response.error.errorMessage,
                    rawResponse: _response.rawResponse,
                });
        }
    }

    /**
     * Detects an object within an uploaded image file. Make sure to load the model you're using for detection first!
     *
     * @param {File | fs.ReadStream | Blob} file
     * @param {AmniscientApi.DetectRequest} request
     * @param {AmniscientApiClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link AmniscientApi.BadRequestError}
     *
     * @example
     *     await client.detect(fs.createReadStream("/path/to/your/file"), {
     *         organizationId: "organization_id"
     *     })
     */
    public detect(
        file: File | fs.ReadStream | Blob,
        request: AmniscientApi.DetectRequest,
        requestOptions?: AmniscientApiClient.RequestOptions,
    ): core.HttpResponsePromise<AmniscientApi.DetectResponse> {
        return core.HttpResponsePromise.fromPromise(this.__detect(file, request, requestOptions));
    }

    private async __detect(
        file: File | fs.ReadStream | Blob,
        request: AmniscientApi.DetectRequest,
        requestOptions?: AmniscientApiClient.RequestOptions,
    ): Promise<core.WithRawResponse<AmniscientApi.DetectResponse>> {
        const _request = await core.newFormData();
        _request.append("organization_id", request.organizationId);
        await _request.appendFile("file", file);
        const _maybeEncodedRequest = await _request.getRequest();
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.AmniscientApiEnvironment.Default,
                "detect",
            ),
            method: "POST",
            headers: {
                "x-api-key": await core.Supplier.get(this._options.apiKey),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "amniscient",
                "X-Fern-SDK-Version": "0.0.2",
                "User-Agent": "amniscient/0.0.2",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ..._maybeEncodedRequest.headers,
                ...requestOptions?.headers,
            },
            requestType: "file",
            duplex: _maybeEncodedRequest.duplex,
            body: _maybeEncodedRequest.body,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return {
                data: serializers.DetectResponse.parseOrThrow(_response.body, {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    breadcrumbsPrefix: ["response"],
                }),
                rawResponse: _response.rawResponse,
            };
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new AmniscientApi.BadRequestError(_response.error.body, _response.rawResponse);
                default:
                    throw new errors.AmniscientApiError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                        rawResponse: _response.rawResponse,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.AmniscientApiError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                    rawResponse: _response.rawResponse,
                });
            case "timeout":
                throw new errors.AmniscientApiTimeoutError("Timeout exceeded when calling POST /detect.");
            case "unknown":
                throw new errors.AmniscientApiError({
                    message: _response.error.errorMessage,
                    rawResponse: _response.rawResponse,
                });
        }
    }
}
