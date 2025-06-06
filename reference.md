# Reference

<details><summary><code>client.<a href="/src/Client.ts">detect</a>(file, { ...params }) -> AmniscientApi.DetectResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Detects an object within an uploaded image file. Make sure to load the model you're using for detection first!

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
await client.detect(fs.createReadStream("/path/to/your/file"), {
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

**file:** `File | fs.ReadStream | Blob`

</dd>
</dl>

<dl>
<dd>

**request:** `AmniscientApi.DetectRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AmniscientApiClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

##
