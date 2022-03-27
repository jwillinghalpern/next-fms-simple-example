import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import styles from '../../components/Layout.module.css';
import ContactForm from '../../components/ContactForm';

export default function CrateInspectionPage() {
  const [fieldData, setFieldData] = useState({});
  const router = useRouter();

  async function handleSubmit() {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fieldData),
    });
    const json = await res.json();
    const { recordId } = json;
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
      <h2>Create Contact</h2>
      <ContactForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        fieldData={fieldData}
      />
    </Layout>
  );
}
