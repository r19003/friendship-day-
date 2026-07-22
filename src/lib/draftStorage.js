// Unsent form draft autosave helper in localStorage

const DRAFT_PREFIX = "ami_draft_";

export function saveDraft(formKey, data) {
  try {
    localStorage.setItem(`${DRAFT_PREFIX}${formKey}`, JSON.stringify(data));
  } catch (err) {
    // Ignore quota errors
  }
}

export function loadDraft(formKey) {
  try {
    const item = localStorage.getItem(`${DRAFT_PREFIX}${formKey}`);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function clearDraft(formKey) {
  try {
    localStorage.removeItem(`${DRAFT_PREFIX}${formKey}`);
  } catch {
    // Ignore
  }
}
