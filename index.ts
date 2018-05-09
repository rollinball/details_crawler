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
    for (const entry of data) {
        const params: customsearch_v1.Params$Resource$Cse$List = {
            cx: '<search_engine_id>',
            q: `${entry.name}+${entry.address}`
        }
        const list: AxiosResponse<customsearch_v1.Schema$Search> = await search_api.cse.list({}, {});
        for (const item of list.data.items) {
            const res: Response = await fetch(item.link);
            const content: string = await res.text();
            if (content.search(entry.tel)) {
                console.log('we have a match with the phone number');
            }
        }
    }
}

main();