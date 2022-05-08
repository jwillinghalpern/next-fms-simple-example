import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ListItem from '../../components/ListItem';
import Layout from '../../components/Layout';
import { combineName } from '../../lib/utils';
import Button from '../../components/Button';
import utilStyles from '../../styles/utils.module.css';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import { createQueryString } from '../../lib/utils';

export default function ContactsPage() {
  const router = useRouter();
  const [state, setState] = useState({});
  const page = parseInt(router.query.page) || 1;
  const search = router.query.search;
  const limit = router.query.limit || 5;
  const offset = (parseInt(page) - 1) * limit + 1;
  const totalPages = Math.ceil((state.dataInfo?.foundCount || 1) / limit);

  useEffect(() => {
    if (!offset || !limit) return;
    (async () => {
      const queryString = createQueryString({
        offset,
        limit,
        search,
        asList: true,
      });
      const res = await fetch(`/api/contact?${queryString}`);
      const json = await res.json();
      setState(json);
    })();
  }, [offset, limit, search]);

  function handleLineClick(id) {
    router.push(`/contacts/${id}`);
  }

  function onEditButton(e) {
    e.stopPropagation();
    router.push(`/contacts/edit/${e.target.dataset.id}`);
    return false;
  }

  function handleSearch(search) {
    const queryString = createQueryString({ page: 1, search });
    router.push(`/contacts?${queryString}`);
  }

  return (
    <Layout>
      <div
        style={{
          margin: '10px 0',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          color="primary"
          title="Create Contact"
          onClick={() => router.push('/contacts/create')}
        >
          + New
        </Button>
        <Pagination
          page={page}
          totalItems={state.dataInfo?.foundCount}
          itemsPerPage={limit}
          onFirst={() => {
            const queryString = createQueryString({ ...router.query, page: 1 });
            router.push(`/contacts?${queryString}`);
          }}
          onLast={() => {
            const queryString = createQueryString({
              ...router.query,
              page: totalPages,
            });
            router.push(`/contacts?${queryString}`);
          }}
          onNext={() => {
            const newPage = page + 1 > totalPages ? totalPages : page + 1;
            const queryString = createQueryString({ page: newPage, search });
            router.push(`/contacts?${queryString}`);
          }}
          onPrev={() => {
            const newPage = page - 1 < 1 ? 1 : page - 1;
            const queryString = createQueryString({ page: newPage, search });
            router.push(`/contacts?${queryString}`);
          }}
        />
      </div>
      <Search
        style={{ display: 'flex', justifyContent: 'flex-end' }}
        onSubmit={handleSearch}
        placeholder="Search first name..."
      />
      {search && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {state.dataInfo?.foundCount || 0} results for {search}
        </div>
      )}
      <ul style={{ paddingLeft: 0 }}>
        {state?.data?.map(({ fieldData: contact, recordId }) => (
          <ListItem key={contact.id} onClick={() => handleLineClick(recordId)}>
            <div
              style={{
                display: 'grid',
                gridTemplateAreas: `'image name edit'
																		'image company edit'`,
                gridTemplateColumns: 'auto 1fr 80px',
                alignItems: 'center',
                alignContent: 'center',
                gridGap: '0 1rem',
              }}
            >
              <Image
                src={contact.container || '/images/profile.jpg'}
                className={utilStyles.borderCircle}
                height={50}
                width={50}
                alt={contact.nameLast}
              />
              <h2 style={{ gridArea: 'name', margin: 0 }}>
                {combineName(contact.nameFirst, contact.nameLast)}
              </h2>{' '}
              <Button
                color="link"
                data-id={recordId}
                onClick={onEditButton}
                title="Edit Contact"
                style={{ gridArea: 'edit' }}
              >
                Edit
              </Button>
            </div>
          </ListItem>
        ))}
      </ul>
    </Layout>
  );
}
