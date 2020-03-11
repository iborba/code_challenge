// import { SoundPlayer } from '../src/__ignore/SoundPlayer';
// import { SoundPlayerConsumer } from '../src/__ignore/SoundPlayerConsumer';
// jest.mock('../src/__ignore/SoundPlayer')
// const mockedClass = <jest.Mock<SoundPlayer>>SoundPlayer
import { AppController } from '../src/app'
import * as express from 'express'
// import { mocked } from 'ts-jest/utils'
// jest.mock('../src/app')
// jest.mock('express')
// const mockedExpress = mocked(express, true)
// const mockedExpress = express as jest.Mocked<typeof express>;
// const mockedClass = <jest.Mock<AppController>>AppController

describe('Happy path', () => {
  it('asere he', () => {
    // mockedClass.mockImplementationOnce(() => {
    //   return {
    //     express: require('jest-express'),
    //     middlewares: jest.fn((music: string) => console.log('Playing sound file baitaca.mp3')),
    //     routes: jest.fn((music: string) => console.log('Playing sound file baitaca.mp3')),
    //     start: jest.fn()

    //   }
    // })

    const appController = new AppController()
    appController.express = express()

    appController.start()

    expect(appController.middlewares).toHaveBeenCalled()
  })
})