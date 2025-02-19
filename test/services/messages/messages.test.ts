// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app'
import { MessageData } from '../../../src/client'
import sinon from 'sinon'

describe('messages service', () => {
  let serviceStub: sinon.SinonStubbedInstance<any>

  beforeEach(() => {
    serviceStub = sinon.stub(app.service('messages'))
  })

  afterEach(() => {
    sinon.restore()
  })

  it('registered the service', () => {
    const service = app.service('messages')

    assert.ok(service, 'Registered the service')
  })

  it('creates a message', async () => {
    const messageData: MessageData = {
      text: 'Hello, world!'
    }

    const createdMessage = { id: 1, text: messageData.text }
    serviceStub.create.resolves(createdMessage)

    const message = await app.service('messages').create(messageData)
    assert.ok(message.id, 'Created message has an id')
    assert.strictEqual(message.text, messageData.text, 'Created message has the correct text')

    // Verify that the create method was called with the correct data
    sinon.assert.calledWith(serviceStub.create, messageData)
  })

  it('retrieves a message', async () => {
    const messageData: MessageData = {
      text: 'Hello, world!'
    }

    const createdMessage = { id: 1, text: messageData.text }
    serviceStub.create.resolves(createdMessage)
    serviceStub.get.resolves(createdMessage)

    const message = await app.service('messages').create(messageData)
    const retrievedMessage = await app.service('messages').get(message.id)

    assert.strictEqual(retrievedMessage.id, message.id, 'Retrieved message has the correct id')
    assert.strictEqual(retrievedMessage.text, message.text, 'Retrieved message has the correct text')

    // Verify that the get method was called with the correct id
    sinon.assert.calledWith(serviceStub.get, message.id)
  })

  it('updates a message', async () => {
    const messageData: MessageData = {
      text: 'Hello, world!'
    }

    const createdMessage = { id: 1, text: messageData.text }
    const updatedMessage = { id: 1, text: 'Updated text' }
    serviceStub.create.resolves(createdMessage)
    serviceStub.patch.resolves(updatedMessage)

    const message = await app.service('messages').create(messageData)
    const result = await app.service('messages').patch(message.id, { text: 'Updated text' })

    assert.strictEqual(result.id, message.id, 'Updated message has the correct id')
    assert.strictEqual(result.text, 'Updated text', 'Updated message has the correct text')

    // Verify that the patch method was called with the correct data
    sinon.assert.calledWith(serviceStub.patch, message.id, { text: 'Updated text' })
  })

  it('removes a message', async () => {
    const messageData: MessageData = {
      text: 'Hello, world!'
    }

    const createdMessage = { id: 1, text: messageData.text }
    serviceStub.create.resolves(createdMessage)
    serviceStub.remove.resolves(createdMessage)
    serviceStub.get.rejects(new Error('NotFound'))

    const message = await app.service('messages').create(messageData)
    const removedMessage = await app.service('messages').remove(message.id)

    assert.strictEqual(removedMessage.id, message.id, 'Removed message has the correct id')

    try {
      await app.service('messages').get(message.id)
      assert.fail('Should have thrown an error')
    } catch (error: any) {
      assert.strictEqual(error.message, 'NotFound', 'Error should be NotFound')
    }

    // Verify that the remove method was called with the correct id
    sinon.assert.calledWith(serviceStub.remove, message.id)
  })

  it('finds messages', async () => {
    const messages = [
      { id: 1, text: 'Hello, world!' },
      { id: 2, text: 'Hello, again!' }
    ]
    const paginatedResult = { total: 2, limit: 10, skip: 0, data: messages }
    serviceStub.find.resolves(paginatedResult)

    const result = await app.service('messages').find()

    assert.strictEqual(result.data.length, messages.length, 'Found the correct number of messages')
    assert.deepStrictEqual(result.data, messages, 'Found messages match the expected messages')

    // Verify that the find method was called
    sinon.assert.calledOnce(serviceStub.find)
  })
})
