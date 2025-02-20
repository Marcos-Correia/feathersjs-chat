---
title: Chat Application API v1.0.0
language_tabs:
  - shell: curl
language_clients:
  - shell: ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="chat-application-api">Chat Application API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

API documentation for the Chat Application built with FeathersJS.

Base URLs:

* <a href="http://localhost:3030">http://localhost:3030</a>

<h1 id="chat-application-api-users">Users</h1>

## getUsers

<a id="opIdgetUsers"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3030/users \
  -H 'Accept: application/json'

```

`GET /users`

*Retrieve a list of users*

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "email": "string",
    "avatar": "string"
  }
]
```

<h3 id="getusers-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A list of users|Inline|

<h3 id="getusers-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[User](#schemauser)]|false|none|none|
|» id|integer|false|none|none|
|» email|string|false|none|none|
|» avatar|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## createUser

<a id="opIdcreateUser"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3030/users \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

`POST /users`

*Create a new user*

> Body parameter

```json
{
  "email": "string",
  "password": "string",
  "githubId": "string",
  "avatar": "string"
}
```

<h3 id="createuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UserData](#schemauserdata)|true|User data|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "email": "string",
  "avatar": "string"
}
```

<h3 id="createuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|The created user|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

## getUserById

<a id="opIdgetUserById"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3030/users/{id} \
  -H 'Accept: application/json'

```

`GET /users/{id}`

*Retrieve a user by ID*

<h3 id="getuserbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "email": "string",
  "avatar": "string"
}
```

<h3 id="getuserbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The user data|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

## updateUserById

<a id="opIdupdateUserById"></a>

> Code samples

```shell
# You can also use wget
curl -X PATCH http://localhost:3030/users/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

`PATCH /users/{id}`

*Update a user by ID*

> Body parameter

```json
{
  "email": "string",
  "password": "string",
  "githubId": "string",
  "avatar": "string"
}
```

<h3 id="updateuserbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|
|body|body|[UserPatch](#schemauserpatch)|true|User data to update|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "email": "string",
  "avatar": "string"
}
```

<h3 id="updateuserbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The updated user|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

## deleteUserById

<a id="opIddeleteUserById"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:3030/users/{id} \
  -H 'Accept: application/json'

```

`DELETE /users/{id}`

*Delete a user by ID*

<h3 id="deleteuserbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "email": "string",
  "avatar": "string"
}
```

<h3 id="deleteuserbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The deleted user|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="chat-application-api-messages">Messages</h1>

## getMessages

<a id="opIdgetMessages"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3030/messages \
  -H 'Accept: application/json'

```

`GET /messages`

*Retrieve a list of messages*

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "text": "string",
    "createdAt": 0,
    "userId": 0,
    "user": {
      "id": 0,
      "email": "string",
      "avatar": "string"
    }
  }
]
```

<h3 id="getmessages-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A list of messages|Inline|

<h3 id="getmessages-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Message](#schemamessage)]|false|none|none|
|» id|integer|false|none|none|
|» text|string|false|none|none|
|» createdAt|integer|false|none|none|
|» userId|integer|false|none|none|
|» user|[User](#schemauser)|false|none|none|
|»» id|integer|false|none|none|
|»» email|string|false|none|none|
|»» avatar|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## createMessage

<a id="opIdcreateMessage"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3030/messages \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

`POST /messages`

*Create a new message*

> Body parameter

```json
{
  "text": "string"
}
```

<h3 id="createmessage-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[MessageData](#schemamessagedata)|true|Message data|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "text": "string",
  "createdAt": 0,
  "userId": 0,
  "user": {
    "id": 0,
    "email": "string",
    "avatar": "string"
  }
}
```

<h3 id="createmessage-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|The created message|[Message](#schemamessage)|

<aside class="success">
This operation does not require authentication
</aside>

## getMessageById

<a id="opIdgetMessageById"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3030/messages/{id} \
  -H 'Accept: application/json'

```

`GET /messages/{id}`

*Retrieve a message by ID*

<h3 id="getmessagebyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "text": "string",
  "createdAt": 0,
  "userId": 0,
  "user": {
    "id": 0,
    "email": "string",
    "avatar": "string"
  }
}
```

<h3 id="getmessagebyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The message data|[Message](#schemamessage)|

<aside class="success">
This operation does not require authentication
</aside>

## updateMessageById

<a id="opIdupdateMessageById"></a>

> Code samples

```shell
# You can also use wget
curl -X PATCH http://localhost:3030/messages/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

`PATCH /messages/{id}`

*Update a message by ID*

> Body parameter

```json
{
  "text": "string"
}
```

<h3 id="updatemessagebyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|
|body|body|[MessagePatch](#schemamessagepatch)|true|Message data to update|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "text": "string",
  "createdAt": 0,
  "userId": 0,
  "user": {
    "id": 0,
    "email": "string",
    "avatar": "string"
  }
}
```

<h3 id="updatemessagebyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The updated message|[Message](#schemamessage)|

<aside class="success">
This operation does not require authentication
</aside>

## deleteMessageById

<a id="opIddeleteMessageById"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:3030/messages/{id} \
  -H 'Accept: application/json'

```

`DELETE /messages/{id}`

*Delete a message by ID*

<h3 id="deletemessagebyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "text": "string",
  "createdAt": 0,
  "userId": 0,
  "user": {
    "id": 0,
    "email": "string",
    "avatar": "string"
  }
}
```

<h3 id="deletemessagebyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The deleted message|[Message](#schemamessage)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": 0,
  "email": "string",
  "avatar": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|email|string|false|none|none|
|avatar|string|false|none|none|

<h2 id="tocS_UserData">UserData</h2>
<!-- backwards compatibility -->
<a id="schemauserdata"></a>
<a id="schema_UserData"></a>
<a id="tocSuserdata"></a>
<a id="tocsuserdata"></a>

```json
{
  "email": "string",
  "password": "string",
  "githubId": "string",
  "avatar": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|
|password|string|false|none|none|
|githubId|string|false|none|none|
|avatar|string|false|none|none|

<h2 id="tocS_UserPatch">UserPatch</h2>
<!-- backwards compatibility -->
<a id="schemauserpatch"></a>
<a id="schema_UserPatch"></a>
<a id="tocSuserpatch"></a>
<a id="tocsuserpatch"></a>

```json
{
  "email": "string",
  "password": "string",
  "githubId": "string",
  "avatar": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|
|password|string|false|none|none|
|githubId|string|false|none|none|
|avatar|string|false|none|none|

<h2 id="tocS_Message">Message</h2>
<!-- backwards compatibility -->
<a id="schemamessage"></a>
<a id="schema_Message"></a>
<a id="tocSmessage"></a>
<a id="tocsmessage"></a>

```json
{
  "id": 0,
  "text": "string",
  "createdAt": 0,
  "userId": 0,
  "user": {
    "id": 0,
    "email": "string",
    "avatar": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|text|string|false|none|none|
|createdAt|integer|false|none|none|
|userId|integer|false|none|none|
|user|[User](#schemauser)|false|none|none|

<h2 id="tocS_MessageData">MessageData</h2>
<!-- backwards compatibility -->
<a id="schemamessagedata"></a>
<a id="schema_MessageData"></a>
<a id="tocSmessagedata"></a>
<a id="tocsmessagedata"></a>

```json
{
  "text": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|text|string|false|none|none|

<h2 id="tocS_MessagePatch">MessagePatch</h2>
<!-- backwards compatibility -->
<a id="schemamessagepatch"></a>
<a id="schema_MessagePatch"></a>
<a id="tocSmessagepatch"></a>
<a id="tocsmessagepatch"></a>

```json
{
  "text": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|text|string|false|none|none|

