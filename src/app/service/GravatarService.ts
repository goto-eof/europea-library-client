import { Injectable } from '@angular/core';
import { SHA256 } from 'crypto-js';

const baseUrl = 'https://gravatar.com/avatar';
@Injectable()
export default class GravatarService {
  getAvatarURI(email: string, size: 16 | 32 | 64 | 128 | 256 | 512 = 32) {
    const hash = SHA256(email);
    return `${baseUrl}/${hash}?s=${size}`;
  }
}
