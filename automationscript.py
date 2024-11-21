from contentful_management import Client
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Define constants
CONTENTFUL_SPACE_ID = 'your_space_id'
CONTENTFUL_ACCESS_TOKEN = 'your_contentful_access_token'
GOOGLE_CREDENTIALS_FILE = 'path_to_google_credentials.json'

def fetch_contentful_data():
    """Fetch content from Contentful."""
    client = Client(CONTENTFUL_ACCESS_TOKEN)
    space = client.spaces().find(CONTENTFUL_SPACE_ID)
    entries = space.entries().all()
    return entries

def create_google_doc(service, title, content):
    """Create a Google Doc and populate it with content."""
    doc = service.documents().create(body={'title': title}).execute()
    doc_id = doc.get('documentId')

    # Update the content of the document
    requests = []
    for section in content:
        if section['type'] == 'text':
            requests.append({
                'insertText': {
                    'location': {'index': 1},
                    'text': section['value']
                }
            })
        elif section['type'] == 'image':
            requests.append({
                'insertInlineImage': {
                    'location': {'index': 1},
                    'uri': section['value'],
                    'objectSize': {
                        'height': {'magnitude': 300, 'unit': 'PT'},
                        'width': {'magnitude': 300, 'unit': 'PT'}
                    }
                }
            })
        elif section['type'] == 'table':
            requests.append({
                'insertTable': {
                    'rows': section['value']['rows'],
                    'columns': section['value']['columns'],
                    'location': {'index': 1}
                }
            })
    service.documents().batchUpdate(documentId=doc_id, body={'requests': requests}).execute()

    return f"https://docs.google.com/document/d/{doc_id}/edit"

def main():
    # Fetch data from Contentful
    content = fetch_contentful_data()

    # Authenticate Google Drive API
    credentials = service_account.Credentials.from_service_account_file(
        GOOGLE_CREDENTIALS_FILE,
        scopes=['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/documents']
    )
    drive_service = build('drive', 'v3', credentials=credentials)
    docs_service = build('docs', 'v1', credentials=credentials)

    for entry in content:
        title = entry.fields()['title']
        content_structure = []  # Convert entry fields to text, images, or tables
        if 'text' in entry.fields():
            content_structure.append({'type': 'text', 'value': entry.fields()['text']})
        if 'image' in entry.fields():
            content_structure.append({'type': 'image', 'value': entry.fields()['image']})
        if 'table' in entry.fields():
            content_structure.append({'type': 'table', 'value': entry.fields()['table']})

        doc_link = create_google_doc(docs_service, title, content_structure)
        print(f"Document created: {doc_link}")

if __name__ == '__main__':
    main()
