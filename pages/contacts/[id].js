import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';
import styles from '../../components/Layout.module.css';
import { combineName } from '../../lib/utils';
import Image from 'next/image';

export default function ContactDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [state, setState] = useState({});
  const { recordId } = state?.data?.[0] || {};
  const { nameFirst, nameLast, nameCompany, county, container } =
    state?.data?.[0]?.fieldData || {};
  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await fetch(`../api/contact/${id}`);
      const json = await res.json();
      setState(json);
    })();
  }, [id]);
  return (
    <Layout>
      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}
        className={styles.backToHome}
      >
        <button className={styles.linkButton} onClick={() => router.back()}>
          ← Back
        </button>
        <Link
          style={{ marginRight: '10px' }}
          href={{
            pathname: `/contacts/edit/${id}`,
            query: { initialData: JSON.stringify(state) },
          }}
        >
          <a> ✏️ Edit</a>
        </Link>
      </div>
      <h2>
        {combineName(nameFirst, nameLast)} (recordId: {recordId})
      </h2>
      <h3></h3>
      <div>
        <Image
          src={container || '/images/profile.jpg'}
          height={150}
          width={150}
          alt={nameLast}
        />
      </div>
      <div>
        <small>
          <strong>Company: </strong>
          {nameCompany}
        </small>
      </div>
      <div>
        <small>
          <strong>County: </strong>
          {county}
        </small>
      </div>
    </Layout>
  );
}
