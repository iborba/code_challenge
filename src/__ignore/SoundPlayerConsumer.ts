import { SoundPlayer } from './SoundPlayer';

export class SoundPlayerConsumer {
  soundPlayer = new SoundPlayer();

  playSomethingCool() {
    const coolSoundFileName = 'song.mp3';
    console.log('entrei em playSomethingCool')
    return this.soundPlayer.playSoundFile(coolSoundFileName);
  }
}
