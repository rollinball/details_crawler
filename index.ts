// creer un search engine a l'url https://cse.google.com/cse/all avec pour Schema Type "Thing"
import { GoogleApis, customsearch_v1 } from 'googleapis';
import { AxiosResponse } from 'axios';

const data: Array<any> = [
    {
        name: 'Aric',
        address: 'Tel Aviv'
    },
    {
        name: 'Shmuel',
        address: 'Tel Aviv',
        tel: '0546546908'
    }
]

async function main ()
{
    const search_api: customsearch_v1.Customsearch = new customsearch_v1.Customsearch({ }, new GoogleApis());
    // here loop over each person details
    for (const entry of data) {
        const params: customsearch_v1.Params$Resource$Cse$List = {
            cx: '<search_engine_id>',
            //this is the query
            q: `${entry.name}+${entry.address}`
        }
        // here we perform the actual search query
        const list: AxiosResponse<customsearch_v1.Schema$Search> = await search_api.cse.list(params, {});
        for (const item of list.data.items) {
            // here we fetch the content at the url found by google
            const res: Response = await fetch(item.link);
            const content: string = await res.text();
            // here we can play with the content, look for informations, check regexp, etc...
            if (content.search(entry.tel)) {
                console.log('we have a match with the phone number');
            }
        }
    }
}

main();