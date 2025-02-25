# Reference

## Model

<details><summary><code>client.model.<a href="/src/api/resources/model/client/Client.ts">loadModel</a>(modelId, { ...params }) -> AmniscientApi.ModelLoadModelResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Initializes a model for inference. This endpoint must be called before running any detections.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.model.loadModel("model_id", {
    organizationId: "organization_id",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**modelId:** `string` — The model ID of an active and trained AI model within your organization

</dd>
</dl>

<dl>
<dd>

**request:** `AmniscientApi.ModelLoadModelRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Model.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Detection
