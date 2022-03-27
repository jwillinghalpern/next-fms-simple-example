import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import styles from '../../../components/Layout.module.css';
import ContactForm from '../../../components/ContactForm.js';
import { objectDiff, objectIsEmpty } from '../../../lib/utils';

export default function CrateInspectionPage(props) {
  const router = useRouter();
  const [fieldData, setFieldData] = useState({});
  const [fieldDataOriginal, setFieldDataOriginal] = useState({});

  useEffect(() => {
    (async () => {
      if (!router.isReady) return;
      const res = await fetch(`/api/contact/${router.query.id}`);
      const json = await res.json();
      const data = json.data[0].fieldData;
      setFieldData(data);
      setFieldDataOriginal(data);
    })();
  }, [router.isReady, router.query.id]);

  async function handleSubmit() {
    const recordId = router.query.id;
    const diff = objectDiff(fieldDataOriginal, fieldData);
    console.log('diff', diff);
    if (objectIsEmpty(diff)) {
      console.log('no change');
      router.push(`/contacts/${recordId}`);
      return;
    }
    const res = await fetch(`/api/contact/${recordId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(diff),
    });
    if (res.ok) router.push(`/contacts/${recordId}`);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFieldData({ ...fieldData, [name]: value });
  }

  return (
    <Layout>
      <div className={styles.backToHome}>
        <button className={styles.linkButton} onClick={() => router.back()}>
          ← Back
        </button>
      </div>
      <h2>Edit Contact</h2>
      <ContactForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        fieldData={fieldData}
      />
    </Layout>
  );
}
