import { Hero } from '../models/hero';
const db: any = require('./db.json');

export const HEROES: Hero[] = db.heroes;
