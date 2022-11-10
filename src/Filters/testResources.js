const activeFilters = {
  'agreementStatus': [
    'active',
    'draft',
    'in_negotiation',
    'requested'
  ]
};

const data = {
  'agreements': [{
    'id': '0086c607-7c90-4633-bccd-4bc047806b72',
    'dateCreated': '2022-11-01T11:06:05Z',
    'name': 'OS Test Agreement 1',
    'orgs': '[]',
    'externalLicenseDocs': '[]',
    'outwardRelationships': '[]',
    'customProperties': {
      'AuthorIdentification': [{
        'id': 3,
        'internal': true,
        'value': {
          'id': '2c91809c8430de73018430e6c3d60059',
          'value': 'email_domain',
          'label': 'Email Domain'
        },
        'type': {
          'id': '2c91809c8430de73018430e6c430005f',
          'retired': false,
          'ctx': 'OpenAccess',
          'name': 'AuthorIdentification',
          'primary': true,
          'category': {
            'id': '2c91809c8430de73018430e6c3d00057',
            'desc': 'AuthIdent',
            'internal': false,
            'values': [{
              'id': '2c91809c8430de73018430e6c3e4005e',
              'value': 'ror_id',
              'label': 'ROR ID'
            },
            {
              'id': '2c91809c8430de73018430e6c3d9005a',
              'value': 'orcid',
              'label': 'ORCID'
            },
            {
              'id': '2c91809c8430de73018430e6c3dc005b',
              'value': 'over_institute',
              'label': 'Over Institute'
            },
            {
              'id': '2c91809c8430de73018430e6c3e1005d',
              'value': 'ringgold_id',
              'label': 'Ringgold ID'
            },
            {
              'id': '2c91809c8430de73018430e6c3d30058',
              'value': 'other',
              'label': 'Other'
            },
            {
              'id': '2c91809c8430de73018430e6c3d60059',
              'value': 'email_domain',
              'label': 'Email Domain'
            },
            {
              'id': '2c91809c8430de73018430e6c3de005c',
              'value': 'over_ip_range',
              'label': 'Over IP Range'
            }
            ]
          },
          'defaultInternal': true,
          'label': 'Author Identification',
          'description': 'Author Identification',
          'weight': 0,
          'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
        }
      }]
    },
    'contacts': '[]',
    'tags': '[]',
    'lastUpdated': '2022-11-01T11:06:05Z',
    'inwardRelationships': '[]',
    'startDate': '2022-11-01',
    'linkedLicenses': '[]',
    'docs': '[]',
    'periods': [{
      'id': 'c6bd0757-357c-454f-8ca2-31fa0533fbb5',
      'startDate': '2022-11-01',
      'owner': {
        'id': '0086c607-7c90-4633-bccd-4bc047806b72'
      },
      'periodStatus': 'current'
    }],
    'usageDataProviders': '[]',
    'agreementStatus': {
      'id': '2c91809c8430de73018430e6c2bf0037',
      'value': 'active',
      'label': 'Active'
    },
    'supplementaryDocs': '[]',
    'cancellationDeadline': null,
    'alternateNames': '[]',
    'version': 0
  },
  {
    'id': 'd8a2bd19-84b1-4720-b5ae-17c9148b8581',
    'dateCreated': '2022-11-01T11:00:58Z',
    'name': 'J Test Agreement',
    'orgs': '[]',
    'externalLicenseDocs': '[]',
    'outwardRelationships': '[]',
    'customProperties': '{}',
    'contacts': '[]',
    'tags': '[]',
    'lastUpdated': '2022-11-01T11:00:58Z',
    'inwardRelationships': '[]',
    'startDate': '2022-11-02',
    'linkedLicenses': '[]',
    'docs': '[]',
    'periods': [{
      'id': '09cf62b0-fc3b-4f3d-94d3-e71d952c45eb',
      'startDate': '2022-11-02',
      'owner': {
        'id': 'd8a2bd19-84b1-4720-b5ae-17c9148b8581'
      },
      'periodStatus': 'next'
    }],
    'usageDataProviders': '[]',
    'agreementStatus': {
      'id': '2c91809c8430de73018430e6c2bf0037',
      'value': 'active',
      'label': 'Active'
    },
    'supplementaryDocs': '[]',
    'cancellationDeadline': null,
    'alternateNames': '[]',
    'version': 0
  }
  ],
  'agreementStatusValues': [{
    'id': '2c91809c8430de73018430e6c2bf0037',
    'value': 'active',
    'label': 'Active'
  },
  {
    'id': '00b0491aba472f86fe4060756d844c0a',
    'value': 'closed',
    'label': 'Closed'
  },
  {
    'id': '2c91809c8430de73018430e6c2b10034',
    'value': 'draft',
    'label': 'Draft'
  },
  {
    'id': '2c91809c8430de73018430e6c2ba0036',
    'value': 'in_negotiation',
    'label': 'In negotiation'
  },
  {
    'id': '2c91809c8430de73018430e6c2b60035',
    'value': 'requested',
    'label': 'Requested'
  }
  ],
  'renewalPriorityValues': [{
    'id': '2c91809c8430de73018430e6c29b0030',
    'value': 'definitely_cancel',
    'label': 'Definitely cancel'
  },
  {
    'id': '2c91809c8430de73018430e6c291002e',
    'value': 'definitely_renew',
    'label': 'Definitely renew'
  },
  {
    'id': '2c91809c8430de73018430e6c296002f',
    'value': 'for_review',
    'label': 'For review'
  }
  ],
  'isPerpetualValues': [{
    'id': '2c91809c8430de73018430e6c2750028',
    'value': 'no',
    'label': 'No'
  },
  {
    'id': '2c91809c8430de73018430e6c2700027',
    'value': 'yes',
    'label': 'Yes'
  }
  ],
  'orgRoleValues': [{
    'id': '2c91809c8430de73018430e6c1b60001',
    'value': 'content_provider',
    'label': 'Content provider'
  }],
  'contactRoleValues': [{
    'id': '2c91809c8430de73018430e6c2f90045',
    'value': 'agreement_owner',
    'label': 'Agreement owner'
  },
  {
    'id': '2c91809c8430de73018430e6c2fe0046',
    'value': 'authorized_signatory',
    'label': 'Authorized signatory'
  },
  {
    'id': '2c91809c8430de73018430e6c3020047',
    'value': 'erm_librarian',
    'label': 'ERM librarian'
  },
  {
    'id': '2c91809c8430de73018430e6c3070048',
    'value': 'subject_specialist',
    'label': 'Subject specialist'
  }
  ],
  'tagsValues': []
};

export {
  activeFilters,
  data
};
