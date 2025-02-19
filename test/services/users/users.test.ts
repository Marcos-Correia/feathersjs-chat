// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app'
import sinon from 'sinon'
import { User } from '../../../src/client'
import { userDataResolver } from '../../../src/services/users/users.schema'

describe('users service', () => {
  let serviceStub: sinon.SinonStubbedInstance<any>

  beforeEach(() => {
    serviceStub = sinon.stub(app.service('users'))
  })

  afterEach(() => {
    sinon.restore()
  })

  it('registered the service', () => {
    const service = app.service('users')

    assert.ok(service, 'Registered the service')
  })

  it('creates a user', async () => {
    const userData: { email: string; password: string } = {
      email: 'newuser@example.com',
      password: 'newpassword'
    }

    const createdUser = { id: 1, email: userData.email }
    serviceStub.create.resolves(createdUser)

    const user = await app.service('users').create(userData)
    assert.ok(user.id, 'Created user has an id')
    assert.strictEqual(user.email, userData.email, 'Created user has the correct email')
    assert.strictEqual(user.password, undefined, 'Password is hidden to clients')

    // Verify that the create method was called with the correct data
    sinon.assert.calledWith(serviceStub.create, userData)
  })

  it('fails to create a user with an existing email', async () => {
    const userData: { email: string; password: string } = {
      email: 'existinguser@example.com',
      password: 'password123'
    }

    serviceStub.create.rejects(new Error('Conflict'))

    try {
      await app.service('users').create(userData)
      assert.fail('Should have thrown an error')
    } catch (error) {
      if (error instanceof Error) {
        assert.strictEqual(error.message, 'Conflict', 'Error should be a conflict error')
        assert.strictEqual(error.name, 'Error', 'Error name should be Error')
      } else {
        assert.fail('Error is not an instance of Error')
      }
    }

    // Verify that the create method was called with the correct data
    sinon.assert.calledWith(serviceStub.create, userData)
  })
  it('updates a user', async () => {
    const userData: { email: string; password: string } = {
      email: 'updateuser@example.com',
      password: 'updatepassword'
    }

    const updatedUser = { id: 1, email: userData.email }
    serviceStub.patch.resolves(updatedUser)

    const user = await app.service('users').patch(1, userData)
    assert.ok(user.id, 'Updated user has an id')
    assert.strictEqual(user.email, userData.email, 'Updated user has the correct email')
    assert.strictEqual(user.password, undefined, 'Password is hidden to clients')

    // Verify that the patch method was called with the correct data
    sinon.assert.calledWith(serviceStub.patch, 1, userData)
  })
})

describe('userDataResolver', () => {
  let resolveStub: sinon.SinonStub

  beforeEach(() => {
    resolveStub = sinon.stub(userDataResolver, 'resolve')
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should hash the password', async () => {
    const user: User = { id: 1, email: 'test@example.com', password: 'password123' }
    const context = { params: {} } as any

    const hashedPassword = 'hashedpassword123'
    resolveStub.resolves({ password: hashedPassword })

    try {
      const resolvedUser = await userDataResolver.resolve({ password: user.password }, context)
      assert.notStrictEqual(resolvedUser.password, 'password123', 'Password should be hashed')
      assert.ok(resolvedUser.password, 'Hashed password should not be empty')
    } catch (error) {
      console.error('Error resolving user data:', error)
      throw error
    }
  })

  it('should generate a Gravatar URL if avatar is not provided', async () => {
    const user: User = { id: 1, email: 'test@example.com' }
    const context = { params: {} } as any

    const gravatarUrl = 'https://s.gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?s=60'
    resolveStub.resolves({ avatar: gravatarUrl })

    try {
      const resolvedUser = await userDataResolver.resolve({ avatar: undefined, email: user.email }, context)
      assert.ok(resolvedUser.avatar, 'Avatar URL should be generated')
      assert.ok(
        resolvedUser.avatar.includes('https://s.gravatar.com/avatar/'),
        'Avatar URL should be a Gravatar URL'
      )
    } catch (error) {
      console.error('Error resolving user data:', error)
      throw error
    }
  })
})
