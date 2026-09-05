# Campus Found

CampusFound is a mobile application for managing lost and found items within a college campus.

The system provides a structured workflow in which authorized administrators publish found items and students can search for those items, submit ownership claims, and track claim decisions.

CampusFound is currently under active development and is being prepared for the `v0.9.0-beta` release.

## Overview

CampusFound is designed to replace informal lost and found processes with a centralized and transparent system.

The application supports two primary roles:

### Student

Students can:

- Register and verify their college email address
- Sign in securely using JWT-based authentication
- Browse active found items
- Search and filter items by category
- View item details
- Submit ownership claims
- Track claim status
- View claim history
- Manage profile information
- Change account password

### Administrator

Administrators can:

- Create found item records
- Upload item images
- Update item details
- Delete items
- Review student claims
- Approve or reject claims
- Close an item after a successful claim decision

## Claim Workflow

The claim process follows this flow:

```text
Administrator posts an item
        |
        v
Item becomes ACTIVE
        |
        v
Student submits a claim
        |
        v
Claim becomes PENDING
        |
        v
Administrator reviews the claim
        |
        +--> APPROVED --> Item becomes CLOSED
        |
        +--> REJECTED
```

An approved claim does not complete the collection process automatically. The student must visit the official Lost and Found office and complete physical verification before the item is handed over.

## Technology Stack

### Mobile Application

- React Native
- Expo
- TypeScript
- React Navigation
- Axios
- AsyncStorage

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
- Maven

### Services

- PostgreSQL with Supabase
- ImageKit for image storage
- Brevo for email and OTP delivery
- GitHub Actions for continuous integration

## Project Repositories

The project is maintained in separate frontend and backend repositories.

Frontend repository:

```text
https://github.com/alexpandiyan1914/campusfound
```

The frontend repository is also used for beta APK releases and issue tracking.

## Local Development

### Prerequisites

Install the following tools before running the project:

- Node.js
- npm
- Git
- Expo Go or an Android emulator

### Clone the Repository

```bash
git clone https://github.com/alexpandiyan1914/campusfound.git
cd campusfound
```

### Install Dependencies

```bash
npm install
```

### Configure the Backend URL

Create the required local environment configuration and provide the backend API URL.

Example:

```env
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:8080/api
```

Do not commit private credentials, API keys, secrets, or production environment values to the repository.

### Start the Application

```bash
npx expo start
```

For Android:

```bash
npx expo start --android
```

## Development Workflow

CampusFound uses the following branch strategy:

```text
Alex-dev
   |
   v
Development and testing
   |
   v
GitHub Actions
   |
   v
Pull Request
   |
   v
master
```

`Alex-dev` is used for active development.

`master` is reserved for stable and release-ready code.

Before creating or merging a pull request, run:

```bash
npx tsc --noEmit
```

GitHub Actions also performs automated frontend checks.

## Current Release

The current development target is:

```text
v0.9.0-beta
```

The beta release is intended to validate the complete Lost and Found workflow, collect student feedback, identify bugs, and prepare the application for a stable release.

Planned work before the beta release includes:

- Final user interface cleanup
- Push notification integration
- Functional testing
- Bug fixing
- Deployment configuration
- Android APK release

## Issue Reporting

Bugs and technical issues can be reported through GitHub Issues:

```text
https://github.com/alexpandiyan1914/campusfound/issues
```

When reporting an issue, include:

- A short description of the problem
- Steps to reproduce it
- Expected behavior
- Actual behavior
- Screenshot, if relevant
- Application version
- Device information, if relevant

Do not include passwords, OTPs, authentication tokens, or other sensitive information in issue reports.

## Terms and Privacy

CampusFound includes project-specific Terms and Conditions and a Privacy Policy.

See:

- [Terms and Conditions](./TERMS.md)
- [Privacy Policy](./PRIVACY.md)

## License

CampusFound is licensed under the MIT License.

See the [LICENSE](./LICENSE) file for the complete license text.

## Project Context

CampusFound is being developed for use within Thiagarajar College of Engineering as a structured campus Lost and Found solution.

The project focuses on making the process of finding, claiming, verifying, and collecting lost belongings more organized and transparent.

## Developer

Alexpandiyan A  
Department of Computer Science and Engineering  
Thiagarajar College of Engineering

GitHub: https://github.com/alexpandiyan1914
