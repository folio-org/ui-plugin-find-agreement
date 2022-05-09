
import { get, isEmpty } from 'lodash';
import parseQueryString from './util';

const getItems = (schema, request, recordName) => {
  const queryString = request.url.split('?')[1];
  const params = parseQueryString(queryString);
  let { filters } = params;

  // when there is only one filter and its not an array
  if (filters && !isEmpty(filters) && !Array.isArray(filters)) filters = [filters];

  // returns a flattened array of { name, value } pairs of filter name and its value
  const parsed = filters && filters.map((filter) => {
    return filter.split('||').map(f => {
      const [name, value] = f.split('==');
      return { name, value };
    });
  }).flat();

  let results;
  if (parsed) {
    results = schema[recordName]?.where(record => {
      return parsed.reduce((acc, { name, value }) => {
        return acc || get(record, name) === value;
      }, false);
    }).models ?? [];
  } else {
    results = schema[recordName].all().models;
  }

  return { results, totalRecords: results?.length ?? 0 };
};

export default function config() {
  this.get('/configurations/entries', {
    configs: []
  });

  this.get('/erm/sas', (schema, request) => {
    return getItems(schema, request, 'agreements');
  });

  this.get('/erm/contacts', { results: [] });

  this.get('/erm/custprops', () => []);

  this.get('/erm/refdata/InternalContact/role', () => {
    return [
      {
        id: '188389636d9ece46016d9ed0180c001f',
        value: 'agreement_owner',
        label: 'Agreement owner',
      },
      {
        id: '188389636d9ece46016d9ed018160020',
        value: 'authorized_signatory',
        label: 'Authorized signatory',
      },
      {
        id: '188389636d9ece46016d9ed018200021',
        value: 'erm_librarian',
        label: 'ERM librarian',
      },
      {
        id: '188389636d9ece46016d9ed018280022',
        value: 'subject_specialist',
        label: 'Subject specialist',
      },
    ];
  });


  this.get('/erm/org', () => [
    {
      'id':'7f13f51d-f63f-48ba-b919-224c92f2d16b',
      'name':'American Society of Civil Engineers'
    },
    {
      'id':'8da1f390-85ec-4e0d-8402-d527bce7ab87',
      'name':'BMJ Publishing Group'
    },
    {
      'id':'f74a1300-100d-4b1d-8235-b9ea8aa2743e',
      'name':'Beuth Verlag GmbH'
    },
    {
      'id':'9f9490c2-b9a3-499e-b4aa-a0d7b935a1a6',
      'name':'De Gruyter'
    },
    {
      'id':'205b1261-f1b9-47c0-a1d9-6a6773eb3d85',
      'name':'Duncker & Humblot'
    },
    {
      'id':'458c693f-752a-49a5-b838-358fa7b43852',
      'name':'Economist Intelligence Unit'
    },
    {
      'id':'f47de736-dc35-4710-8282-fd5c16bfbe30',
      'name':'Edward Elgar'
    },
    {
      'id':'f6692cec-9a1c-4834-9b6e-a1cbaf8300e7',
      'name':'Emerald Group Publishing Limited'
    },
    {
      'id':'4af97a5c-fce0-49e3-8f0f-c69ef676887f',
      'name':'Hogrefe eContent'
    },
    {
      'id':'42e97151-2db8-4bdc-99f9-ebe5f9a84b22',
      'name':'IGI Global'
    },
    {
      'id':'95d925c1-4117-43f9-bc04-65a17988a2db',
      'name':'JSTOR'
    },
    {
      'id':'b8fdf0c8-ad9f-4f22-b1e3-1f1a31bf79bb',
      'name':'Oxford University Press'
    },
    {
      'id':'792e7329-9eb9-48b8-9c4f-e904409c6e71',
      'name':'PBS Video'
    },
    {
      'id':'6656af28-eb05-465e-823a-b87ff2178b45',
      'name':'Portico'
    },
    {
      'id':'43bd1bf9-b87e-4997-82b7-7f706a46be42',
      'name':'Sage'
    },
    {
      'id':'d5d0a3b7-5e30-4206-bb8c-d7617cf1a44d',
      'name':'Springer Nature'
    },
    {
      'id':'97433065-2ca1-4f9d-ab06-fdd5a385458a',
      'name':'Taylor & Francis'
    }
  ]);

  this.get('/erm/refdata/SubscriptionAgreement/renewalPriority', () => {
    return [
      {
        'id':'2c9180b474be24cb0174be2514f8002c',
        'value':'definitely_renew',
        'label':'Definitely renew'
      },
      {
        'id':'2c9180b474be24cb0174be2514fc002d',
        'value':'for_review',
        'label':'For review'
      },
      {
        'id':'2c9180b474be24cb0174be251500002e',
        'value':'definitely_cancel',
        'label':'Definitely cancel'
      }
    ];
  });

  this.get('/erm/refdata/SubscriptionAgreement/agreementStatus', () => {
    return [
      {
        'id':'b74ac455d82be32e0d0214db79fbfcec',
        'value':'closed',
        'label':'Closed'
      },
      {
        'id':'2c9180b474be24cb0174be2515350035',
        'value':'draft',
        'label':'Draft'
      },
      {
        'id':'2c9180b474be24cb0174be25153a0036',
        'value':'requested',
        'label':'Requested'
      },
      {
        'id':'2c9180b474be24cb0174be25153f0037',
        'value':'in_negotiation',
        'label':'In negotiation'
      },
      {
        'id':'2c9180b474be24cb0174be2515440038',
        'value':'active',
        'label':'Active'
      }
    ];
  });

  this.get('/erm/refdata/SubscriptionAgreement/renewalPriority', () => {
    return [
      {
        'id':'2c9180b474be24cb0174be2514f8002c',
        'value':'definitely_renew',
        'label':'Definitely renew'
      },
      {
        'id':'2c9180b474be24cb0174be2514fc002d',
        'value':'for_review',
        'label':'For review'
      },
      {
        'id':'2c9180b474be24cb0174be251500002e',
        'value':'definitely_cancel',
        'label':'Definitely cancel'
      }
    ];
  });

  this.get('/erm/refdata/SubscriptionAgreementOrg/role', () => {
    return [
      {
        'id':'2c9180b474be24cb0174be251550003a',
        'value':'agreement_owner',
        'label':'Agreement owner'
      },
      {
        'id':'2c9180b474be24cb0174be251554003b',
        'value':'authorized_signatory',
        'label':'Authorized signatory'
      },
      {
        'id':'2c9180b474be24cb0174be25155a003c',
        'value':'erm_librarian',
        'label':'ERM librarian'
      },
      {
        'id':'2c9180b474be24cb0174be25155e003d',
        'value':'subject_specialist',
        'label':'Subject specialist'
      }
    ];
  });

  this.get('/erm/refdata/SubscriptionAgreement/isPerpetual', () => {
    return [
      {
        'id':'2c9180b474be24cb0174be2515050030',
        'value':'yes',
        'label':'Yes'
      },
      {
        'id':'2c9180b474be24cb0174be2515080031',
        'value':'no',
        'label':'No'
      }
    ];
  });

  this.get('/tags', { tags: [
    {
      'id':'c3799dc5-500b-44dd-8e17-2f2354cc43e3',
      'label':'urgent',
      'description':'Requires urgent attention',
      'metadata':{
        'createdDate':'2020-09-24T03:19:32.823+0000',
        'updatedDate':'2020-09-24T03:19:32.823+0000'
      }
    },
    {
      'id':'d3c8b511-41e7-422e-a483-18778d0596e5',
      'label':'important',
      'metadata':{
        'createdDate':'2020-09-24T03:19:32.841+0000',
        'updatedDate':'2020-09-24T03:19:32.841+0000'
      }
    }
  ] });
}
