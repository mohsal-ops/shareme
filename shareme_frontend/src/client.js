import ImageUrlBuilder from "@sanity/image-url";
import {createClient} from '@sanity/client'



const config = {
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID ,
  dataset: 'production',
  apiVersion: '2023-08-07',
  token: process.env.REACT_APP_SANITY_TOKEN
}
export const client = createClient(config)
const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);