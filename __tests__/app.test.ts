import { SoundPlayer } from '../src/__ignore/SoundPlayer';
import { SoundPlayerConsumer } from '../src/__ignore/SoundPlayerConsumer';

jest.mock('../src/__ignore/SoundPlayer')

const mockedClass = <jest.Mock<SoundPlayer>>SoundPlayer

describe('Happy path', () => {
  it('asere he', () => {
    mockedClass.mockImplementation(() => {
      return {
        foo: 'bar',
        playSoundFile: jest.fn((music: string) => console.log('Playing sound file baitaca.mp3'))
      }
    })
    
    const consumer = new SoundPlayerConsumer()

    const response = consumer.playSomethingCool()

    console.log('lll', response)

    expect(mockedClass).toHaveBeenCalled()
    expect(mockedClass).toHaveBeenCalledTimes(1)
  })
})