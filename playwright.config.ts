import {defineConfig} from '@playwright/test'
import process from 'node:process'
export default defineConfig({testDir:'./tests',fullyParallel:false,workers:1,use:{baseURL:'http://127.0.0.1:4187/Program-Atlas/',browserName:'chromium',viewport:{width:1440,height:1000},trace:'retain-on-failure'},webServer:{command:'npm run preview',url:'http://127.0.0.1:4187/Program-Atlas/',reuseExistingServer:!process.env.CI,timeout:30000},reporter:'list'})
